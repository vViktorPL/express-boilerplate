import { AwilixContainer } from "awilix";
import { ModulesLoader } from "../modules/modules-loader";
import { Container } from "../container";

export async function registerModules<T>(container: Container<T>) {
  const modulesLoader = new ModulesLoader(container as AwilixContainer);

  modulesLoader.loadModules();

  return container;
}
