import { asFunction } from "awilix";
import { errorHandler } from "../middleware/error-handler";
import { Container } from "../container";

export async function registerMiddlewares<T>(container: Container<T>) {
  return container.register({
    errorHandler: asFunction(errorHandler),
  });
}
