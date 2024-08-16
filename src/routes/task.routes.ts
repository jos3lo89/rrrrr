import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { TaskController } from "../controllers/task.controller";
import { ValidatorMiddleware } from "../middleware/validator.middleware";
import { taskCreateZod } from "../schemas/task.schema";

const route = Router();

route.post(
  "/create",
  AuthMiddleware.authentication,
  ValidatorMiddleware.bodyValidator(taskCreateZod),
  TaskController.create
);
route.get("/all", AuthMiddleware.authentication, TaskController.getAll);

route.delete(
  "/delete/:id",
  AuthMiddleware.authentication,
  TaskController.delete
);

route.put(
  "/update/:id",
  AuthMiddleware.authentication,
  ValidatorMiddleware.bodyValidator(taskCreateZod),
  TaskController.update
);

export default route;
