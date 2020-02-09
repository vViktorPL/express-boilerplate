import { AwilixContainer } from "awilix";
import { MikroORM } from "mikro-orm";

declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare global {
  namespace NodeJS {
    interface Global {
      container: AwilixContainer;
      dbConnection: MikroORM<any>;
    }
  }
}
