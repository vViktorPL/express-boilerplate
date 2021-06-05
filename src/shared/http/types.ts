import { Request, Response, NextFunction } from "express";
import { Decoder } from "smartly-typed-decoder";
import { DecoderValidInput, DecoderValue } from "smartly-typed-decoder/dist/utils";

export interface Action {
  invoke(req: Request, res: Response, next?: NextFunction): Promise<void>;
}

export type ActionRequest<TRequestDecoder extends Decoder<{ body?: object; params?: Record<string, string>; query?: Record<string, string> }, any>> = Request<
  DecoderValue<TRequestDecoder>["params"],
  any,
  DecoderValue<TRequestDecoder>["body"],
  DecoderValue<TRequestDecoder>["query"]
> & {
  rawBody: DecoderValidInput<TRequestDecoder>["body"];
};

export type BodyDocs<T extends Decoder<any, any>> = {
  properties: {
    [Key in keyof DecoderValidInput<T>["body"]]: {
      type: TypeName<DecoderValidInput<T>["body"][Key]>;
      required: undefined extends DecoderValidInput<T>["body"][Key] ? false : true;
    };
  };
};

export type PathDocs<T extends Decoder<any, any>> = {
  properties: {
    [Key in keyof DecoderValidInput<T>["params"]]: {
      required: undefined extends DecoderValidInput<T>["params"][Key] ? false : true;
    };
  }
}

export type QueryDocs<T extends Decoder<any, any>> = {
  properties: {
    [Key in keyof DecoderValidInput<T>["query"]]: {
      type: TypeName<DecoderValidInput<T>["query"][Key]>;
      required: undefined extends DecoderValidInput<T>["query"][Key] ? false : true;
    };
  }
}


type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends Array<any> ? "array" :
  T extends object ? "object" :
    string;