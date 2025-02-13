'use client'
// componente generado del lado del cliente

import { useAppDispatch, useAppSelector } from '@/store';
import { addOne, resetCount, substractOne } from '@/store/counter/counterSlice';
import { count } from 'console';
import { useEffect } from 'react';


interface Props {
    productsNumber: number | string;
}

interface CounterResponse {
    method: string;
    count: string;
}

// peticion fetch
const getApiCounter = async(): Promise<CounterResponse> => {
    const data = await fetch('/api/counter').then( res => res.json() );
    console.log(data);
    return data;
}

// recibimos una propiedad generada en un componente del lado del servidor
export const CartCounter = ({ productsNumber = 0 }: Props) => {
    // manejo del state de forma local
    // const [counter, setCounter] = useState(productsNumber)

    // manejo del state de forma global con RTK
    // tomamos el valor del state
    const count = useAppSelector( state => state.counter.count )
    // nos ayuda a despachar las acciones del store
    const dispatch = useAppDispatch();

    // se utiliza un useEfect para repintar la pantalla con el valor entregado por el backend
    // useEffect(() => {
    //   dispatch( resetCount(productsNumber) );
    // }, [dispatch, productsNumber])
    

    // llamado a la petición fetch
    useEffect(() => {
        getApiCounter().then(({ count }) => dispatch( resetCount(parseInt(count) ) ))
    }, [dispatch])

    return (
        <>
            <span className="text-9xl">{count}</span>
            <div className="flex">

                <button
                    onClick={() => dispatch( substractOne() ) }
                    className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
                    -1
                </button>

                <button
                    onClick={() => dispatch( addOne() ) }
                    className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
                    +1
                </button>
                
            </div>

        </>
    )
}
