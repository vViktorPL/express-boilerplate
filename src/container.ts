import {
  asFunction,
  asValue,
  AwilixContainer,
  createContainer as createAwilixContainer,
  InjectionMode, ResolveOptions,
  Resolver,
} from "awilix";
import * as http from "http";
import { Connection } from "typeorm";
import { createApp } from "./app/app";
import { AppConfig, appConfigFactory } from "./config/app";

import { registerCommonDependencies } from "./container/common";
import { registerDatabase } from "./container/database";
import { loadEnvs } from "./config/env";
import { registerMiddlewares } from "./container/middlewares";
import { registerQueryHandlers } from "./container/query-handlers";
import { registerCommandHandlers } from "./container/command-handlers";
import { registerRouting } from "./container/routing";
import { registerSubscribers } from "./container/subscribers";
import { registerGraphQLDependencies } from "./container/graphql";
import { registerModules } from "./container/modules";

loadEnvs();

export interface ContainerDependencies {
  connection?: Connection;
  appConfig?: AppConfig;
}

type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T;

type MapResolversToInstances<T extends Record<string | symbol, Resolver<any>>> = {
  [Key in keyof T]: ReturnType<T[Key]["resolve"]>;
};

export interface Container<Cradle = {}> extends Omit<AwilixContainer<Cradle extends object ? Cradle : any>, "register" | "resolve"> {
  register<TDepName extends string | symbol, TDepInstance>(
    name: TDepName,
    registration: Resolver<TDepInstance>,
  ): Container<Cradle & Record<TDepName, TDepInstance>>;
  register<TDeps extends Record<string | symbol, Resolver<any>>>(
    nameAndRegistrationPair: TDeps,
  ): Container<Cradle & MapResolversToInstances<TDeps>>;
  resolve<TName extends keyof Cradle>(name: TName, resolveOptions?: ResolveOptions): Cradle[TName];
}

export async function createContainer(dependencies?: ContainerDependencies) {
  const appConfig = dependencies?.appConfig ? dependencies.appConfig : appConfigFactory(process.env);

  const baseContainer = createAwilixContainer({
    injectionMode: InjectionMode.PROXY,
  }) as Container;

  const container =
    await Promise.resolve(baseContainer)
      .then(registerCommonDependencies(appConfig))
      .then(registerMiddlewares)
      .then(registerQueryHandlers)
      .then(registerCommandHandlers)
      .then(registerRouting)
      .then(registerGraphQLDependencies)
      .then(registerSubscribers)
      .then(registerDatabase(dependencies))
      .then(registerModules);

  const containerWithApp = container.register({
    app: asFunction(createApp).singleton(),
  });

  const { app } = containerWithApp.cradle;

  return container.register({
    server: asValue(http.createServer(app)),
  });
}

export type AppContainer = UnwrapPromise<ReturnType<typeof createContainer>>;
