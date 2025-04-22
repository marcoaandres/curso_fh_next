import { ProductGrid, Title } from "@/components";
import type { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  };
}

const seedProducts = initialData.products;

export default function CategoryPage({ params }: Props) {

  // obtenemos los parametros recibidos de la url
  const { id } = params;

  // Tipado para las opciones validas
  const labels: Record<Category, string> = {
    'men': 'Para Hombres',
    'women': 'Para Mujeres',
    'kid': 'Para Niños',
    'unisex': 'Para todos'
  }
  const products = seedProducts.filter((product) => product.gender === id);

  if (products.length < 1) {
    // redireccionamos a la pagina 404 con la siguiente funcion
    notFound();
  }
  return (
    <>
      <Title title={`Artículos ${labels[id]} `} subtitle="Todos losProductos" className="mb-2" />
      <ProductGrid Products={products} />
    </>
  );
}
