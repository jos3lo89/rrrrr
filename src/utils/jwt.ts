import jwt from "jsonwebtoken";

import { Decoded, Payload } from "../types/tipos";

const jwtSecret = process.env.JWT_SECRET;

export const createdToken = async (payload: Payload) => {
  return new Promise((resolve, reject) => {
    if (jwtSecret) {
      jwt.sign(payload, jwtSecret, { expiresIn: "1d" }, (err, token) => {
        if (err) reject(new Error("error al crear el token "));
        resolve(token);
      });
    } else {
      reject(new Error("Asigne un  JWT_SECRET"));
    }
  });
};

export const verifyToken = async (token: string): Promise<Decoded> => {
  return new Promise((resolve, reject) => {
    if (jwtSecret) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) reject(new Error("Error al verificar el token"));
        resolve(decoded as Decoded);
      });
    } else {
      reject(new Error("Asigne un  JWT_SECRET"));
    }
  });
};

/* export const verifyToken = async <T extends object = Decoded>(
  token: string
): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (jwtSecret) {
      jwt.verify(
        token,
        jwtSecret,
        (
          err: VerifyErrors | null,
          decoded: JwtPayload | string | undefined
        ) => {
          if (err || typeof decoded !== "object" || !decoded) {
            return reject(err || "Invalid token");
          }
          resolve(decoded as T);
        }
      );
    } else {
      reject("Asigne un JWT_SECRET");
    }
  });
}; */
