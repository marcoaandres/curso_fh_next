'use client';

import { useState } from "react";
import { useCartStore } from "@/store";
import type { CartProduct, Product, Size } from "@/interfaces";
import { QuantitySelector, SizeSelector } from "@/components";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {
    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [selectedSize, setSelectedSize] = useState<Size|undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);

    const addToCart = () => {
        setPosted(true);
        if(!selectedSize) {return};

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            size: selectedSize,
            quantity,
            price: product.price,
            image: product.images[0],
        }

        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSelectedSize(undefined);
    }

  return (
    <>
        {
            posted && !selectedSize && (
                <span className="mt-2 text-red-500 fade-in">
                    Debe de seleccionar una talla*
                </span>

            )
        }
        
        {/* Selector de tallas */}
        <SizeSelector
          selectedSize={selectedSize}
          availableSizes={product.sizes}
            setSize={setSelectedSize}
        />

        {/* Selector de Cantidad */}
        <QuantitySelector 
            quantity={quantity}
            setQuantity={setQuantity} 
        />

        {/* Button */}
        <button
            onClick={addToCart} 
            className="btn-primary my-5">Agregar al carrito</button>
    </>
  )
}
