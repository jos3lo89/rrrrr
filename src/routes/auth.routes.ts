import { Router } from "express";
import { AuthContrller } from "../controllers/auth.controller";
import { ValidatorMiddleware } from "../middleware/validator.middleware";
import { loginSchemaZod, registerSchemaZod } from "../schemas/auth.schema";

const route = Router();

route.post(
  "/register",
  ValidatorMiddleware.bodyValidator(registerSchemaZod),
  AuthContrller.register
);

route.post(
  "/login",
  ValidatorMiddleware.bodyValidator(loginSchemaZod),
  AuthContrller.login
);

export default route;
