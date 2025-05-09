import { ProductCart } from "@/products/components/ProductCart";
import { products } from "@/products/data/products";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        products.map(product => (
          <ProductCart key={product.id} {...product}/>
        ))
      }
    </div>
  );
}
