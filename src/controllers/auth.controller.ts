import { Request, Response } from "express";
import { AuthModel } from "../model/auth.model";
import { createdToken } from "../utils/jwt";

export class AuthContrller {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthModel.register(req.body);

      const { id, email, name } = user;
      const token = await createdToken({ id, email, name });

      res.cookie("token", token, {
        httpOnly: false,
        sameSite: "none",
        secure: true,
      });

      const { password: _, ...userWithOutPassword } = user;

      res.status(201).json(userWithOutPassword);
    } catch (error: any) {
      return res.status(400).json({ message: [error.message] });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const user = await AuthModel.login(req.body);

      const { id, email, name } = user;

      const token = await createdToken({ id, email, name });

      if (!token) throw new Error("No se pudo crear el token");

      res.cookie("token", token, {
        httpOnly: false,
        sameSite: "none",
        secure: true,
      });

      const { password: _, ...userWithOutPassword } = user;

      res.status(200).json(userWithOutPassword);
    } catch (error: any) {
      return res.status(400).json({ message: [error.message] });
    }
  }
}
