import { Response } from "express";
import { QueryBus } from "../../../../shared/query-bus";
import { UsersQuery } from "../queries/users";
import { ActionHandler } from "../../../../shared/action/request-decorator";
import { Action } from "../../../../shared/action/wrapper";

export interface UsersActionDependencies {
  queryBus: QueryBus;
}

/**
 * @swagger
 *
 * /api/users/users:
 *   get:
 *     description: desc
 *     responses:
 *       201:
 *         description: desc
 *       400:
 *         description: Validation Error
 *       500:
 *         description: Internal Server Error
 */
export default class UsersAction implements Action {
  constructor(private dependencies: UsersActionDependencies) {}

  @ActionHandler()
  async invoke(response: Response) {
    const queryResult = await this.dependencies.queryBus.execute(
      new UsersQuery({
        // query props
      }),
    );
    return response.json(queryResult.result);
  }
}
