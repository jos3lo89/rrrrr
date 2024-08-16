import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { TaskController } from "../controllers/task.controller";

const route = Router();

route.get("/all", AuthMiddleware.authentication, TaskController.getAll);

export default route;
