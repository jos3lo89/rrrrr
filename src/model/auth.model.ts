import { User } from "@prisma/client";
import prisma from "../config/db";
import { compare, encrypt } from "../utils/bcrypt";
import { LoginData } from "../types/tipos";

export class AuthModel {
  static async register(userData: User) {
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

    return newUser;
  }

  static async login(userData: LoginData) {
    const userFound = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (!userFound) throw new Error("Usuario no existe");

    const passwordMatch = await compare(userData.password, userFound.password);

    if (!passwordMatch) throw new Error("Correo o contraseña incorrectos");

    return userFound;
  }
}
