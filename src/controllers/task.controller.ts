import { Request, Response } from "express";

export class TaskController {
  static async getAll(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("Usuario no encontrado");

      res.status(200).json(req.user);
    } catch (error: any) {
      return res.status(400).json({ message: [error.message] });
    }
  }
}
