import { Task, TaskUpdated } from "../types/tipos";
import prisma from "../config/db";

export class TaskModel {
  static async getAll(id: string) {
    try {
      const listTask = await prisma.task.findMany({
        where: {
          user_id: id,
        },
      });

      if (!listTask) throw new Error("No se pudo listar las tareas");

      return listTask;
    } catch (error: any) {
      throw Error;
    }
  }

  static async create(taskData: Task) {
    try {
      const newTask = await prisma.task.create({
        data: {
          title: taskData.title,
          description: taskData.description,
          user_id: taskData.idUser,
        },
      });

      if (!newTask) throw new Error("No se pudo crear la tarea");

      return newTask;
    } catch (error: any) {
      throw Error;
    }
  }

  static async delete(id: string) {
    try {
      const taskDeleted = await prisma.task.delete({ where: { id } });

      if (!taskDeleted) {
        throw new Error("No se pudo eliminar la tarea o no se econtro");
      }

      return taskDeleted;
    } catch (error) {
      throw Error;
    }
  }

  static async update(taskData: TaskUpdated) {
    try {
      const taskUpdated = await prisma.task.update({
        where: {
          id: taskData.id,
        },
        data: {
          title: taskData.title,
          description: taskData.description,
        },
      });

      if (!taskUpdated) {
        throw new Error("No se pudo actualizar la tarea o no encontro ");
      }

      return taskUpdated;
    } catch (error: any) {
      throw Error;
    }
  }
}
