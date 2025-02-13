import { NextResponse } from "next/server";
// esto se ejecuta del lado del servidor
export async function GET(request: Request) {

    console.log({ method: request.method });

    // se recomienda siempre regresar un objeto como respuesta
    return NextResponse.json({
        method: 'GET',
        count: 100,
    })
}