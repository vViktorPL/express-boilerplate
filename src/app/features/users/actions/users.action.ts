import { Response } from "express";
import { QueryBus } from "../../../../shared/query-bus";
import { UsersQuery } from "../queries/users";
import { ActionHandler, Response as Res } from "../../../../shared/actions-decorators/request-decorator";

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
export default class UsersAction {
  constructor(private dependencies: UsersActionDependencies) {}

  @ActionHandler()
  async invoke(@Res response: Response) {
    const queryResult = await this.dependencies.queryBus.execute(
      new UsersQuery({
        // query props
      }),
    );
    return response.json(queryResult.result);
  }
}
