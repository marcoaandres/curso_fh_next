import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  });

  if (!todo) {
    return NextResponse.json({ message: "Todo no existente" }, { status: 404 });
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;
  try {
    // sacamos las propiedades que nos interesan, si llega algo más lo desechamos
    const { complete, description } = await putSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        complete: complete,
        description: description,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
