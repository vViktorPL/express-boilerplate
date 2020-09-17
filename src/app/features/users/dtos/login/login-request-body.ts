import { Length } from "class-validator";

export class LoginRequestBody {
  public static create(data: Partial<LoginRequestBody>): LoginRequestBody {
    const object = new LoginRequestBody();
    Object.assign(object, data);
    return object;
  }

  @Length(5, 10)
  authToken: string;
}
