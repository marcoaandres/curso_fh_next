'use client';

import Link from 'next/link';
import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';
import { currencyFormat } from '@/utils';

export const OrderSummary = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useCartStore((state) => state.cart); // forzar recarga cuando el carrito cambie
    const getSummaryInformation = useCartStore((state) => state.getSummaryInformation);
    const { itemsInCart, subTotal, taxRate, tax, total } = getSummaryInformation();

    useEffect(() => {
        setIsLoaded(true);
    }, [])

    if(!isLoaded) {
        return <>Loading...</>;
    }
    
  return (
    <>
        <div className="bg-white rounded-xl shadow-xl p-7 h-[300px]">
          <h2 className="text-2xl mb-2"> Resumen de orden</h2>
          <div className="grid grid-cols-2">

            <span>No. Productos</span>
            <span className="text-right">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>

            <span>Subtotal</span>
            <span className="text-right">{ currencyFormat(subTotal)}</span>

            <span>Impuestos ({taxRate * 100}%)</span>
            <span className="text-right">{ currencyFormat(tax)}</span>

            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">{ currencyFormat(total)}</span>
          </div>

          <div className="mt-5 mb-2 w-full">
            <Link href="/checkout/address"
              className=" flex btn-primary justify-center"
            > 
              Checkout
            </Link>
          </div>

        </div>
    </>
  )
}
