import { v4 } from "uuid";
import { Entity, PrimaryKey, IdEntity } from "mikro-orm";

interface UserProps {
  id: string;
}

@Entity({
  collection: "user",
})
export class User implements IdEntity<User> {
  public static create(data: Partial<UserProps>): User {
    const entity = new User();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryKey()
  id: string = v4();
}
