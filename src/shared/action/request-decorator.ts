import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { ValidationError } from "../../errors/validation.error";
const MAPPED_PARAMS = "mapped-params";

const PARAM_TYPES = {
  BODY: "body",
  QUERY: "query",
  PATH: "path",
  HEADERS: "headers",
  REQUEST: "req",
  RESPONSE: "res",
};

interface ParameterMapping {
  type: string;
}

interface ParametersMap {
  [key: string]: ParameterMapping;
}

function mapProperty(target: any, key: any, index: number, type: string) {
  const mappedParamsKey = `${MAPPED_PARAMS}-${key}`;
  const types = Reflect.getMetadata("design:paramtypes", target, key);
  const mappedParams: ParametersMap = Reflect.getOwnMetadata(mappedParamsKey, target, key) || {};

  mappedParams[`${types[index].prototype.constructor.name}${index}`] = {
    type,
  };

  Reflect.defineMetadata(mappedParamsKey, mappedParams, target, key);
}

export function Body(target: any, key: string, index: number) {
  mapProperty(target, key, index, PARAM_TYPES.BODY);
}

export function Query(target: any, key: string, index: number) {
  mapProperty(target, key, index, PARAM_TYPES.QUERY);
}

export function Path(target: any, key: string, index: number) {
  mapProperty(target, key, index, PARAM_TYPES.PATH);
}

export function Headers(target: any, key: string, index: number) {
  mapProperty(target, key, index, PARAM_TYPES.HEADERS);
}

export function Request(target: any, key: string, index: number) {
  mapProperty(target, key, index, PARAM_TYPES.REQUEST);
}

export function Response(target: any, key: string, index: number) {
  mapProperty(target, key, index, PARAM_TYPES.RESPONSE);
}

export function ActionHandler() {
  return function actionHandlerDecorator(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const mappedParamsKey = `${MAPPED_PARAMS}-${propertyKey}`;
    const types = Reflect.getMetadata("design:paramtypes", target, propertyKey);

    descriptor.value = async function override(...args: any[]) {
      const mappedArgs = args.map((value: any, index: number) => {
        switch (index) {
          case 2:
          case 3:
          case 4:
          case 5:
            return types[index].create(value);
          default:
            return value;
        }
      });

      return Promise.all(mappedArgs.map((mappedArg: any) => validateOrReject(mappedArg)))
        .then(() => originalMethod.apply(this, mappedArgs))
        .catch((errors) => {
          throw new ValidationError(errors);
        });
    };

    return descriptor;
  };
}
