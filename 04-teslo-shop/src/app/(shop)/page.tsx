export const revalidate = 60; //60 seconds

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";
// import { initialData } from "@/seed/seed";

// const products = initialData.products;

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams; 
  const pageToShow = page ? parseInt( page ) : 1;
  const {products, totalPages} = await getPaginatedProductsWithImages({ page: pageToShow });


  if(products.length === 0){
    redirect("/");
  }
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid Products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
