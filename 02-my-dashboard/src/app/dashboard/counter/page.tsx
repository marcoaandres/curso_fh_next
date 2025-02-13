import { CartCounter } from "@/shopping-cart";

// Meta data para nuestro seo friendly
export const metadata = {
 title: 'Counter Page',
 description: 'Contador con useState',
};


export default function CounterPage() {

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <span>Productos en el carrito</span>
           
           {/* 
            client compnent importado que interactua con el usuario
            aquí enviamos una propiedad generada del lado del servidor a un client component
           */}
           <CartCounter productsNumber={20}/>
        </div>
    )
}
