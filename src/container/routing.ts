import { Lifetime, asClass, asFunction } from "awilix";
import { usersRouting } from "../app/features/example/routing";
import { Container } from "../container";
// ROUTING_IMPORTS

export async function registerRouting<T>(container: Container<T>) {
  container.loadModules(["src/app/**/*.action.js"], {
    formatName: "camelCase",
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
      register: asClass,
    },
  });

  return container.register({
    usersRouting: asFunction(usersRouting),
    // ROUTING_SETUP
  });
}
