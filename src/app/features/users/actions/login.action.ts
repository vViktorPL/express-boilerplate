import { Request, Response } from "express";
import { CommandBus } from "../../../../shared/command-bus";
import { LoginCommand } from "../commands/login.command";
import {
  ActionHandler,
  Body,
  Path,
  Query,
  Headers,
  Request as Req,
  Response as Res,
} from "../../../../shared/actions-decorators/request-decorator";
import { LoginRequestBody } from "../dtos/login/login-request-body";
import { LoginRequestQuery } from "../dtos/login/login-request-query";
import { LoginRequestParams } from "../dtos/login/login-request-params";
import { LoginRequestHeaders } from "../dtos/login/login-request-headers";

export interface LoginActionDependencies {
  commandBus: CommandBus;
}

/**
 * @swagger
 *
 * /api/users/login:
 *   post:
 *     security: []
 *     summary: login to app
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              authToken:
 *                type: string
 *     responses:
 *       200:
 *        description: auth success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                refreshToken:
 *                  type: string
 *       400:
 *         description: Validation Error
 *       500:
 *         description: Internal Server Error
 */
export default class LoginAction {
  constructor(private dependencies: LoginActionDependencies) {}

  @ActionHandler()
  async invoke(
    @Body body: LoginRequestBody,
    @Query query: LoginRequestQuery,
    @Path path: LoginRequestParams,
    @Headers headers: LoginRequestHeaders,
    @Res response: Response,
    @Req req: Request,
  ) {
    const result = await this.dependencies.commandBus.execute(
      new LoginCommand({
        authToken: body.authToken,
      }),
    );

    return response.json({
      body,
      result,
      query,
      path,
      headers,
    });
  }
}
