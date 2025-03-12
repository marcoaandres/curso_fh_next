export const dynamic = 'force-dynamic';
export const revalidate = 0;

// opcines para cambiar la cache por defecto:
// con dynamic cambiamos el comportamiento dinamoco de la página a completamente estático o completamente dinamico
//El revalidate establece el tiempo de revalidación para la página

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
 title: 'Server todos',
 description: 'Server todos',
};
export default async function ServerTodosPage() {

  // en un página generada en el lado del servidor, podemos hacer :
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <>
    <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo/>
      </div>
      <TodosGrid todos={todos}/>
    </>
  );
}



