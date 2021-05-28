import { asValue } from "awilix";
import { Logger } from "winston";
import { createConnection, ConnectionOptions } from "typeorm";
import { Container, ContainerDependencies } from "../container";
import * as db from "../config/db";
// MODELS_IMPORTS

type DatabaseDependencies = {
  logger: Logger;
};

export const registerDatabase = (dependencies?: ContainerDependencies) => async <T extends DatabaseDependencies>(
  container: Container<T>,
) => {
  const dbConnection = dependencies?.connection || (await createConnection(db as ConnectionOptions));

  try {
    await dbConnection.runMigrations();
  } catch (err) {
    container.cradle.logger.debug(`Migrations: ${err}`);
  }
  return container.register({
    dbConnection: asValue(dbConnection),
    // MODELS_SETUP
  });
};
