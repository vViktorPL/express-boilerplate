import { asClass } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

import UsersQueryHandler from "../app/features/example/query-handlers/users.query.handler";
import { Container } from "../container";
// HANDLERS_IMPORTS

export async function registerQueryHandlers<T>(container: Container<T>) {
  return container.register({
    queryHandlers: asArray<any>([
      asClass(UsersQueryHandler),
      // QUERY_HANDLERS_SETUP
    ]),
  });
}
