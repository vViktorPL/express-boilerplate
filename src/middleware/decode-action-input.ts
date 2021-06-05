import { Decoder } from "smartly-typed-decoder";
import { NextFunction, Request, Response } from "express";
import { DecoderValidInput, DecoderValue } from "smartly-typed-decoder/dist/utils";

type ValidActionDecoderInput = {
  body?: object;
  params?: Record<string, string>;
  query?: Partial<Record<string, string | string[]>>;
};

type ActionDecoderOutput = {
  body?: any;
  params?: any;
  query?: any;
};

type ValidActionInputDecoder<TDecoder> = DecoderValidInput<TDecoder> extends ValidActionDecoderInput
  ? DecoderValue<TDecoder> extends ActionDecoderOutput
    ? TDecoder
    : never
  : never;

export const decodeActionInput = <TDecoder extends Decoder<ValidActionDecoderInput, ActionDecoderOutput>>(
  decoder: ValidActionInputDecoder<TDecoder>,
) => (req: Request, res: Response, next: NextFunction) => {
  const { body, query, params } = req;
  const { body: parsedBody, query: parsedQuery, params: parsedParams } = decoder.decode({ body, query, params });

  /* eslint-disable no-param-reassign */
  (req as any).rawBody = body;
  req.body = parsedBody;
  (req as any).rawQuery = query;
  req.query = parsedQuery;
  (req as any).params = params;
  req.params = parsedParams;

  next();
};
