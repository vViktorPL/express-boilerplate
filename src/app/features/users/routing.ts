import * as express from "express";

import LoginAction from "./actions/login.action";
import UsersAction from "./actions/users.action";
import { wrapAction } from "../../../shared/action/wrapper";
// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  loginAction: LoginAction;
  usersAction: UsersAction;
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const router = express.Router();

  router.post("/login/:id", [], wrapAction(actions.loginAction));
  router.get("/users", [], wrapAction(actions.usersAction));
  // ACTIONS_SETUP

  return router;
};
