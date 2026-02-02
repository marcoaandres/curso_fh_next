'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";


export const ProductsInCart = () => {
    const productsInCart = useCartStore((state) => state.cart);
    const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
    const removeProduct = useCartStore((state) => state.removeProduct);
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
      setLoaded(true);
    }, [])

    useEffect(() => {
      if(productsInCart.length === 0 && loaded){
        router.replace('/empty');
      }
    }, [productsInCart, loaded, router]);
    
    
    
  return (
    <>
      {loaded && productsInCart?.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />
          <div>
            <Link href={`/product/${product.slug}`} className="hover: underline cursor-pointer">
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector quantity={product.quantity} setQuantity={(quantity) => updateProductQuantity(product, quantity)}  />
            <button className="underline mt-3" onClick={() => removeProduct(product)}>Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
