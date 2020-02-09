import "mocha";
import { use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { MikroORM } from "mikro-orm";
import { createContainer } from "../src/container";

use(chaiAsPromised);

const clearDb = async (_connection: MikroORM) => {};

before(async function all() {
  this.timeout(5000);

  global.container = await createContainer();
  global.dbConnection = global.container.resolve("orm");
});

beforeEach(async () => {
  if (global.dbConnection) {
    await clearDb(global.dbConnection);
  }
});

after(async () => {
  if (global.dbConnection) {
    await global.dbConnection.close();
  }
});
