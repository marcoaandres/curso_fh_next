'use client'

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";

// importacion de nuestro helper para actualizar el todo
import * as todosApi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";

interface Props{
  todos?: Todo[];
}
export const TodosGrid = ( {todos = [] }: Props) => {

  // actualizar la UI, esto genera un flashaso casí inperceptible
  // importar de next/navigate
  const router = useRouter();

  const toogleTodo = async(id: string, complete: boolean) => {
    const updateTodo = await todosApi.updateTodo(id, complete);
    console.log(updateTodo);
    // refresca la ruta actual y solo actualiza lo que tenga que actualizar sin destruir lo demás
    router.refresh();
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        todos.map( todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={ toogleTodo } />
        ))
      }
    </div>

  )
}
