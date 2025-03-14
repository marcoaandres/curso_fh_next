/*
 cookie: cart
 {
    'uui-123-1': 4,
    'uui-123-2': 1,
    'uui-123-4': 3,
 }
 */

import { getCookie, hasCookie, setCookie } from "cookies-next";


// Action que optiene la cookie que llega al servidor   
 export const getCookieCart = ():{ [id: string]: number } => {

    if(hasCookie('cart')){
        const cookieCart = JSON.parse( getCookie('cart') as string || '{}' );

        console.log({cookieCart});
        return cookieCart;
    }
    return {};
 }

//  accion para agregar prodictos al carrito
export const addProductToCart = (id: string) => {
    const cookieCart = getCookieCart();

    if(cookieCart[id]){
        cookieCart[id] += 1;
    }else{
        cookieCart[id] = 1;
    }

    setCookie('cart', JSON.stringify(cookieCart));
}

// accion para remover el producto del carrito
export const removeProductFromCart = (id: string) => {
    const cookieCart = getCookieCart();

    if(cookieCart[id]){
        delete cookieCart[id];
    }
    setCookie('cart', JSON.stringify(cookieCart));
}

export const removeSingleItemFromCart = (id: string) => {
    const cookieCart = getCookieCart();
    if( !cookieCart[id] ) return;

    if(cookieCart[id] > 1){
        cookieCart[id] -= 1;
    }else{
        delete cookieCart[id];
    }

    setCookie('cart', JSON.stringify(cookieCart));
}
