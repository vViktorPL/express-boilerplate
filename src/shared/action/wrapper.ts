import * as express from "express";

export interface Action<B = any, Q = any, P = any, H = any> {
  invoke: (
    response: express.Response,
    request: express.Request,
    body: B,
    query: Q,
    params: P,
    headers: H,
  ) => Promise<any>;
}

export const wrapAction = (action: Action<any, any, any, any>) => {
  return async (req: express.Request, res: express.Response) => {
    await action.invoke(res, req, req.body, req.query, req.params, req.headers);
  };
};
