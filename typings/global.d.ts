import { Connection } from "typeorm";
import { AppContainer } from "../src/container";

declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare global {
  export type Dependencies = AppContainer["cradle"];

  namespace NodeJS {
    interface Global {
      container: AppContainer;
      dbConnection: Connection;
    }
  }
}
