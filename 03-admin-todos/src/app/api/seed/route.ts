import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'
//rag

export async function GET(request: Request){

    // eliminar la bbdd
    await prisma.todo.deleteMany(); //delete * from todo
    // eliminar usuarios
    await prisma.user.deleteMany();

    // crear usuario y sus todos
    const user = await prisma.user.create({
        data: {
            name: "Marco Andrés",
            email: 'test@marcoandres.com',
            password: bcrypt.hashSync('marco123'),
            roles: ['admin', 'client', 'super-user'],
            todos:{
                create:[
                    {description: 'Tomar curso react', complete: true},
                    {description: 'Tomar curso TS', complete: true},
                    {description: 'Crear proyecto con react y ts', complete: true},
                    {description: 'Tomar curso next'},
                    {description: 'Crear proyecto con next'},
                ]
            }
        }
    })

    // crear todo en la bbdd
    // const todo = await prisma.todo.create({
    //     data: {description: ' Comprar pan'},
    // })

    // crear varios todos en la bbdd
    // await prisma.todo.createMany({
    //     data: [
            // {description: 'Tomar curso react', complete: true},
            // {description: 'Tomar curso TS', complete: true},
            // {description: 'Crear proyecto con react y ts', complete: true},
            // {description: 'Tomar curso next'},
            // {description: 'Crear proyecto con next'},
    //     ]
    // })


    return NextResponse.json({
        message: 'Seed Executed',
        user
    })
}