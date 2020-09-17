export class LoginRequestParams {
  public static create(data: Partial<LoginRequestParams>): LoginRequestParams {
    const object = new LoginRequestParams();
    Object.assign(object, data);
    return object;
  }

  id: string;
}
