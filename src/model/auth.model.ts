// import { User } from "@prisma/client";
import prisma from "../config/db";
import { compare, encrypt } from "../utils/bcrypt";
import { LoginData, User } from "../types/tipos";

export class AuthModel {
  static async register(userData: User) {
    try {
      const userFound = await prisma.user.findFirst({
        where: {
          email: userData.email,
        },
      });

      if (userFound) throw new Error("Correo electronico ya tomado");

      const passwordHash = await encrypt(userData.password, 10);

      const newUser = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: passwordHash,
        },
      });
      if (!newUser) throw new Error("No se pudo crear el usuario");

      return newUser;
    } catch (error: any) {
      throw Error;
    }
  }

  static async login(userData: LoginData) {
    try {
      const userFound = await prisma.user.findFirst({
        where: {
          email: userData.email,
        },
      });

      if (!userFound) throw new Error("Usuario no existe");

      const passwordMatch = await compare(
        userData.password,
        userFound.password
      );

      if (!passwordMatch) throw new Error("Correo o contraseña incorrectos");

      return userFound;
    } catch (error: any) {
      throw Error;
    }
  }
}
