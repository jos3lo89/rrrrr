import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export class ValidatorMiddleware {
  static bodyValidator =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const body =
          Object.getPrototypeOf(req.body) === null ? { ...req.body } : req.body;

        schema.parse(body);
        next();
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res
            .status(400)
            .json({ message: error.errors.map((e) => e.message) });
        }

        return res.status(500).json({ message: [error.message] });
      }
    };
}
