import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartProduct } from "@/interfaces";
interface State {
    cart: CartProduct[];

    //metodos
    addProductToCart: (product: CartProduct) => void;
    getTotalItems: () => number;
    updateProductQuantity: ( product: CartProduct, quantity: number ) => void;
    removeProduct: (product: CartProduct) => void;
    getSummaryInformation: () => { itemsInCart: number; subTotal: number; taxRate: number; tax: number; total: number };
}

export const useCartStore = create<State>()(
    // middleware
    // persistir el estado en el local storage, genera un error de hidratacion
    persist(
        (set, get) =>({
            cart: [],
            //metodos
            getTotalItems: () => {
                const {cart} = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },
            addProductToCart: (product: CartProduct) => {
                const {cart} = get();

                //revisar si el producto existe con la talla seleccionada
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );

                if(!productInCart) {
                    //no existe, agregarlo
                    set({
                        cart: [...cart, product]
                    });
                    return;
                }

                //existe, actualizar la cantidad
                const updatedCartProducts = cart.map((item) => {
                    //encontrar el producto y actualizar la cantidad
                    if(item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        }
                    }
                    
                    //si no es el producto, regresarlo tal cual
                    return item;
                });

                // actualizar el estado del carrito
                set({
                    cart: updatedCartProducts
                });
            },
            updateProductQuantity: ( product: CartProduct, quantity: number ) => {
                const {cart} = get();

                //existe, actualizar la cantidad
                const updatedCartProducts = cart.map((item) => {
                    //encontrar el producto y actualizar la cantidad
                    if(item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: quantity
                        }
                    }
                    
                    //si no es el producto, regresarlo tal cual
                    return item;
                });

                // actualizar el estado del carrito
                set({
                    cart: updatedCartProducts
                }); 
            },
            removeProduct: (product: CartProduct) => {
                const {cart} = get();

                const updatedCartProducts = cart.filter((item) => !(item.id === product.id && item.size === product.size));

                // actualizar el estado del carrito
                set({
                    cart: updatedCartProducts
                });
            },
            getSummaryInformation: () => {
                const {cart} = get();
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
                const subTotal = cart.reduce((subtotal, product) => subtotal + (product.price * product.quantity), 0);
                const taxRate = 0.16; //16% IVA
                const tax = subTotal * taxRate;
                const total = subTotal + tax;
                return { itemsInCart, subTotal, taxRate, tax, total };
            }

        })
        ,{
            name: 'shopping-cart',
        }
    )

    
    

) 
