import { Request, Response } from "express";
import { TaskModel } from "../model/task.model";

export class TaskController {
  static async getAll(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("Usuario no encontrado");

      const tasks = await TaskModel.getAll(req.user.id);

      res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("Usuario no encontrado");

      const task = await TaskModel.create({
        ...req.body,
        idUser: req.user.id,
      });

      res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const taskDeleted = await TaskModel.delete(req.params.id);

      res.status(200).json(taskDeleted);
    } catch (error: any) {
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("Usuario no encontrado");

      const taksUpdated = await TaskModel.update({
        id: req.params.id,
        ...req.body,
        idUser: req.user.id,
      });

      res.status(200).json(taksUpdated);
    } catch (error: any) {
      return res.status(400).json({ message: [error.message] });
    }
  }
}
