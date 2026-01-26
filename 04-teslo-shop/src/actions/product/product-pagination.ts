'use server';

import { Gender } from "@/generated/prisma";
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender; 
}

export const getPaginatedProductsWithImages = async({ page = 1, take = 12, gender }: PaginationOptions) => {
    if(isNaN( Number(page) )) page = 1;
    if( page < 1 ) page = 1;
 
    try {
        //1. traemos todos los productos con su relacion de imagenes
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,

            include:{
                ProductImage:{
                    take: 2,
                    select:{
                        url: true
                    }
                }
            },
            where: {
                gender: gender,
            }
        })

        //2. Obtener el total de paginas
        const totalProducts = await prisma.product.count({
            where: {
                gender: gender
            }
        });
        const totalPages = Math.ceil( totalProducts / take );

        // console.log(products)
        // transformamos el objeto para regresarlo como lo pide nuestro tipado construido anteriormente, images: string[]
        return {
            currentPage: page,
            totalPages,
            products: products.map( product => ({
                ...product,
                images: product.ProductImage.map( images => images.url)
            }))
        }



    } catch (error) {
        throw new Error("No se pudo cargar los productos.")
    }
}
