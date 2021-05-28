import { asClass } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

import LoginHandler from "../app/features/example/handlers/login.handler";
import DeleteUserHandler from "../app/features/example/handlers/delete-user.handler";
import { Container } from "../container";
// HANDLERS_IMPORTS

export async function registerCommandHandlers<T>(
  container: Container<T>,
): Promise<Container<T & { commandHandlers: any[] }>> {
  return container.register({
    commandHandlers: asArray<any>([
      asClass(LoginHandler),
      asClass(DeleteUserHandler),
      // COMMAND_HANDLERS_SETUP
    ]),
  });
}
