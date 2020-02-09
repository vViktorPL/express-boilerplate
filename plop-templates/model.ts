import { v4 } from "uuid";
import { Entity, PrimaryKey, IdEntity } from "mikro-orm";

interface {{pascalCase name}}Props {
  id: string;
}

@Entity({
  collection: "{{snakeCase name}}",
})
export class {{pascalCase name}} implements IdEntity<{{pascalCase name}}> {
  public static create(data: Partial<{{pascalCase name}}Props>): {{pascalCase name}} {
    const entity = new {{pascalCase name}}();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryKey()
  id: string = v4();
}
