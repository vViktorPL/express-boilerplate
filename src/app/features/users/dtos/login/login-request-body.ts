import { Length, ValidateNested } from "class-validator";

class Tmp {
  public static create(data?: Partial<Tmp>): Tmp {
    const object = new Tmp();
    Object.assign(object, data);
    return object;
  }

  @Length(5, 10)
  name: string;
}

export class LoginRequestBody {
  public static create(data: Partial<LoginRequestBody>): LoginRequestBody {
    const object = new LoginRequestBody();
    Object.assign(object, {
      ...data,
      tmp: Tmp.create(data.tmp),
    });
    return object;
  }

  @Length(5, 10)
  authToken: string;

  @Length(5, 10)
  name: string;

  @ValidateNested()
  tmp: Tmp;
}
