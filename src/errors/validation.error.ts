import { ValidationError as ClassValidatorError } from "class-validator";
import { HttpError } from "./http.error";
import { BAD_REQUEST } from "http-status-codes";

export class ValidationError extends HttpError {
  public validations: { [key: string]: string };
  constructor(errors: ClassValidatorError[]) {
    super("Validation error", BAD_REQUEST);

    this.validations = this.mapErrors(errors);
  }

  private mapErrors(errors: ClassValidatorError[], parent: string = "") {
    return errors.reduce((validations: any, err: ClassValidatorError) => {
      const key = parent ? `${parent}.${err.property}` : err.property;
      if (err.children.length > 0) {
        const nestedValidations = this.mapErrors(err.children, key);
        validations = {
          ...validations,
          ...nestedValidations,
        };
      } else {
        validations[key] = err.constraints;
      }
      return validations;
    }, {});
  }
}
