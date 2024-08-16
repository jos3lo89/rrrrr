import jwt from "jsonwebtoken";

import { Decoded, Payload } from "../types/tipos";

export const createdToken = async (payload: Payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) reject(new Error("error al crear el token "));
        resolve(token);
      }
    );
  });
};

export const verifyToken = async (token: string): Promise<Decoded> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) reject(new Error("Error al verificar el token"));
      resolve(decoded as Decoded);
    });
  });
};
