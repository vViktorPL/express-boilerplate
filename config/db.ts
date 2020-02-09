import "reflect-metadata";

import { ReflectMetadataProvider } from "mikro-orm";
import { loadEnvs } from "./env";

loadEnvs();

const createDbConfigFromEnvs = (env: any) => ({
  entitiesDirs: [
    "./src/app/features/users/models/",
    // ENTITIES_SETUP
  ],
  metadataProvider: ReflectMetadataProvider,
  clientUrl: env.POSTGRES_URL,
  dbName: env.POSTGRES_DB,
  type: "postgresql",
  debug: true,
  migrations: {
    path: "./src/migrations",
    pattern: /^[\w-]+\d+\.js$/,
  },
});

const config = createDbConfigFromEnvs(process.env);

export default config;
