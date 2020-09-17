export class LoginRequestHeaders {
  public static create(data: Partial<LoginRequestHeaders>): LoginRequestHeaders {
    const object = new LoginRequestHeaders();
    Object.assign(object, data);
    return object;
  }

  someHeader: string;
}
