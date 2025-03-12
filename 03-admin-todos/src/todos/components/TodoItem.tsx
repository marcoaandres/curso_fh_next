'use client'

import { startTransition, useOptimistic } from "react";
import { Todo } from "@prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

// importacion de modulo css
import styles from "./TodoItem.module.css";
import { boolean } from "yup";

interface Props {
  todo: Todo;
  //acciones
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}
export const TodoItem = ({ todo, toggleTodo }: Props) => {
  // optimizacion para tener la UI actualizada mientras se actualiza en la BBDD
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue })
  );

  // funcion que manda a llamara y actualizar el todooptimizado y actualizarlo en la BBDD
  const onToggleTodo = async() => {
    try {
      // debe estar dentro de una transicion para que no marque error
      startTransition( () => toggleTodoOptimistic(!todoOptimistic.complete ) );
      await toggleTodo( todoOptimistic.id, !todoOptimistic.complete );

    } catch (error) {
      startTransition( () => toggleTodoOptimistic(!todoOptimistic.complete ) );
    }
  }
  return (
    <div className={todo.complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
        // onClick={()=>toggleTodo(todo.id, !todo.complete)}
        onClick={()=> onToggleTodo()}
          className={`
                flex p-2 rounded-md cursor-pointer 
                hover:bg-opacity-100
                ${todo.complete ? "bg-blue-100" : "bg-red-100"} 
                `}
        >
          {todo.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">{todo.description}</div>
      </div>
    </div>
  );
};
