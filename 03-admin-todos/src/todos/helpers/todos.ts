// instrucciones para poster los metodos http 
// no hay logica para manejar el estado

import { Todo } from "@prisma/client"


export const updateTodo = async( id: string, complete: boolean):Promise<Todo> => {
   const body = { complete };

    //peticion desde el cliente
   const todo = await fetch(`/api/todos/${id}`,{
    method: 'PUT',
    body: JSON.stringify(body),
    headers:{
        'Content-Type': 'application/json'
    }
   }).then(res => res.json());

   console.log({todo})

   return todo;
}

export const createTodo = async( description: string):Promise<Todo> => {
    const body = { description };
 
     //peticion desde el cliente
    const todo = await fetch(`/api/todos`,{
     method: 'POST',
     body: JSON.stringify(body),
     headers:{
         'Content-Type': 'application/json'
     }
    }).then(res => res.json());
 
    console.log({todo})
 
    return todo;
 }

 export const deletedTodos = async():Promise<void> => {
    
     //peticion desde el cliente
    await fetch(`/api/todos`,{
     method: 'DELETE',
     headers:{
         'Content-Type': 'application/json'
     }
    }).then(res => res.json());
  }