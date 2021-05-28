import { asValue, asFunction } from "awilix";
import { readFileSync } from "fs";
import { resolve } from "path";
import { createResolvers } from "../graphql/resolvers";
import { Container } from "../container";

export async function registerGraphQLDependencies<T>(container: Container<T>) {
  return container.register({
    graphQLSchema: asValue(readFileSync(resolve("..", "graphql", "schema.gql"), "utf8")),
    resolvers: asFunction(createResolvers),
  });
}
