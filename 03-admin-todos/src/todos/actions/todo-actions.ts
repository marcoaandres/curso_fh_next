"use server";

// aqui pondremos los server actions
// se podria decir que son funciones comunes y corrientes
// para que sean server actions podemos poner dentro de la funcion 'use server o si todas tus acciones serán del lado del servidor puede poner 'use server' en la primera linea del archivo (tambien el cliente lo puede llegar a llamar)

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) {
    throw `Todo con id ${id} no encontrado`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  // lo anterior ya actualizadirectametne a la BBDD, pero no refresca la UI, para refrescar haremos lo siguiente, esto ya no hace el flashaso que sucedia con la solucion anterior
  // importar de next/cache para mantener la cache
  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    return {
      message: "Error creando todo",
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {

    await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });

    revalidatePath("/dashboard/server-todos");
    
};
