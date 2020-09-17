import { validateOrReject } from "class-validator";
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
    const params = Reflect.getMetadata(mappedParamsKey, target, propertyKey);
    descriptor.value = async function override(...args: any[]) {
      const mappedArgs = types.map((value: any, index: number) => {
        const type = types[index];
        const typeName = `${type.prototype.constructor.name}${index}`;
        if (params[typeName]) {
          console.log(params[typeName].type);
          switch (params[typeName].type) {
            case PARAM_TYPES.BODY:
              return type.create(args[0].body);
            case PARAM_TYPES.QUERY:
              return type.create(args[0].qeury);
            case PARAM_TYPES.PATH:
              return type.create(args[0].params);
            case PARAM_TYPES.HEADERS:
              return type.create(args[0].headers);
            case PARAM_TYPES.REQUEST:
              return args[0];
            case PARAM_TYPES.RESPONSE:
              return args[1];
            default:
              return undefined;
          }
        } else {
          return args[index];
        }
      });

      return Promise.all(mappedArgs.map((mappedArg: any) => validateOrReject(mappedArg)))
        .then(() => originalMethod.apply(this, mappedArgs))
        .catch((err) => args[2](err));
    };

    return descriptor;
  };
}
