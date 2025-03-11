import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
 title: 'Rest todos',
 description: 'Rest todos',
};
export default async function RestTodosPage() {

  // solicitud fetch dentro de un efecto(tipo cliente)
  // useEffect(() => {
  //   fetch('/api/todos')
  //   .then(resp => resp.json())
  //   .then(console.log)
  // }, [])
  
  // en un página generada en el lado del servidor, podemos hacer :
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo/>
      </div>
      <TodosGrid todos={todos}/>
    </div>
  );
}



