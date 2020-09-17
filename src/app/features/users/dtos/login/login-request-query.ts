export class LoginRequestQuery {
  public static create(data: Partial<LoginRequestQuery>): LoginRequestQuery {
    const object = new LoginRequestQuery();
    Object.assign(object, data);
    return object;
  }

  params: string;
}
