export const revalidate = 60; //60 seconds

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/generated/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: {
    gender?: string;
  };
  searchParams: {
    page?: string;
  };
}

//const seedProducts = initialData.products;

export default async function CategoryPage({ params, searchParams }: Props) {

  // obtenemos los parametros recibidos de la url
  const { page } = await searchParams;
  const pageToShow = page ? parseInt( page ) : 1;

  // obtenemos el genero desde los parametros
  const gender = await params?.gender || 'unisex';


  // Tipado para las opciones validas
  const labels: Record<string, string> = {
    'men': 'Para Hombres',
    'women': 'Para Mujeres',
    'kid': 'Para Niños',
    'unisex': 'Para todos'
  }
  
  const {products, totalPages} = await getPaginatedProductsWithImages({ page: pageToShow, gender: gender as Gender }); 

  if (products.length < 1) {
    // redireccionamos a la pagina 404 con la siguiente funcion
    notFound();
  }
  return (
    <>
      <Title title={`Artículos ${labels[gender]} `} subtitle="Todos losProductos" className="mb-2" />
      <ProductGrid Products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
