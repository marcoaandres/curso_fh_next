import { notFound } from "next/navigation";

interface Props{
  params:{
    id: string;
  }
}

export default function CategoryPage({ params }:Props) {
  // obtenemos los parametros recibodos de la url
  const { id } = params;

  if(id === 'kids' ){
    // redireccionamos a la pagina 404 con la siguiente funcion
    notFound();
  }
  return (
    <div>
      <h1>Category Page: {id}</h1>
    </div>
  );
}

