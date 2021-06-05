import { Request, Response } from "express";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { QueryBus } from "@tshio/query-bus";
import { AxiosInstance } from "axios";
import { at, number } from "smartly-typed-decoder";
import { Action } from "../../../../shared/http/types";

export interface UsersActionDependencies {
  queryBus: QueryBus;
  axios: AxiosInstance;
}

@ApiPath({
  path: "/api",
  name: "Users",
})
class StarsAction implements Action {
  constructor(private dependencies: UsersActionDependencies) {}

  @ApiOperationGet({
    path: "/example/stars",
    description: "Boilerplate stars count",
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
  async invoke(req: Request, res: Response) {
    const { data: stars } = await this.dependencies.axios.get(
      "https://api.github.com/repos/TheSoftwareHouse/express-boilerplate",
      {
        decoder: at("stargazers_count", number),
      },
    );

    res.json({
      stars,
    });
  }
}

export default StarsAction;
