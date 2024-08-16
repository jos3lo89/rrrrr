import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export class AuthMiddleware {
  static async authentication(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token;

      if (!token) throw new Error("No existe token");

      const decoded = await verifyToken(token);

      if (!decoded) throw new Error("Token no valido");

      req.user = decoded;

      next();
    } catch (error: any) {
      return res.status(400).json({ message: [error.message] });
    }
  }
}
