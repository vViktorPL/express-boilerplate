import { Response } from "express";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import { CommandBus } from "@tshio/command-bus";
import { object, string } from "smartly-typed-decoder";
import { LoginCommand } from "../commands/login.command";
import { Action, ActionRequest, BodyDocs } from "../../../../shared/http/types";
import { decodeActionInput } from "../../../../middleware/decode-action-input";

export interface LoginActionDependencies {
  commandBus: CommandBus;
}

const decoder = object({
  body: object({
    authToken: string,
  }),
});

export const loginActionValidation = decodeActionInput(decoder);

@ApiPath({
  path: "/api",
  name: "Users",
})
class LoginAction implements Action {
  constructor(private dependencies: LoginActionDependencies) {}

  @ApiOperationPost({
    path: "/example/login",
    description: "Login example",
    parameters: {
      body: {
        properties: {
          authToken: {
            type: "string",
            required: true,
          },
        },
      } as BodyDocs<typeof decoder>,
    },
    responses: {
      200: {
        description: "Success",
      },
      400: {
        description: "Validation error",
      },
      500: {
        description: "Internal Server Error",
      },
    },
  })
  async invoke({ body }: ActionRequest<typeof decoder>, res: Response) {
    const result = await this.dependencies.commandBus.execute(
      new LoginCommand({
        authToken: body.authToken,
      }),
    );

    res.json(result);
  }
}

export default LoginAction;
