import * as express from "express";

import LoginAction from "./actions/login.action";
import UsersAction from "./actions/users.action";
// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  loginAction: any;
  usersAction: any;
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const router = express.Router();

  router.post("/login/:id", [], actions.loginAction.invoke.bind(actions.loginAction));
  router.get("/users", [], actions.usersAction.invoke.bind(actions.usersAction));
  // ACTIONS_SETUP

  return router;
};
