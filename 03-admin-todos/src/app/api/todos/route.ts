import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import * as yup from 'yup';

//rag
export async function GET(request: NextRequest) { 

    // tomar los parametros de la url
    const {searchParams} = request.nextUrl
    const take = Number(searchParams.get('take') ?? 10);
    const skip = Number(searchParams.get('skip') ?? 0);

    if(isNaN(take) || isNaN(skip)){
        return NextResponse.json({message: 'take y skip tienen que ser números'},{ status: 400});
    }

    const todos = await prisma.todo.findMany({
        take,
        skip,
    });

  return NextResponse.json(todos);
}


const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
})
export async function POST(request: Request) { 
    // el schema de validacion puede devolver una ecepcion por lo cual hay que trabajarlo con try-catch
    try {
        // tomamos el body de la solicitud
        // const body = await request.json();

        // sacamos las propiedades que nos interesan, si llega algo más lo desechamos
        const {complete, description} = await postSchema.validate( await request.json() );
        const todo = await prisma.todo.create({data: {description, complete}});

        return NextResponse.json(todo);

    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }
}

