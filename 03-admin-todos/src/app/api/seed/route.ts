import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
//rag

export async function GET(request: Request){

    // eliminar la bbdd
    await prisma.todo.deleteMany(); //delete * from todo

    // crear todo en la bbdd
    // const todo = await prisma.todo.create({
    //     data: {description: ' Comprar pan'},
    // })

    // crear varios todos en la bbdd
    await prisma.todo.createMany({
        data: [
            {description: 'Tomar curso react', complete: true},
            {description: 'Tomar curso TS', complete: true},
            {description: 'Crear proyecto con react y ts', complete: true},
            {description: 'Tomar curso next'},
            {description: 'Crear proyecto con next'},
        ]
    })


    return NextResponse.json({
        message: 'Seed Executed'
    })
}