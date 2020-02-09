import { MikroORM } from "mikro-orm";
import db from "../../../config/db";

(async () => {
  const orm = await MikroORM.init(db);
  const migrator = orm.getMigrator();
  await migrator.up(); // runs migrations up to the latest
  await orm.close(true);
})();
