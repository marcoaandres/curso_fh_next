# Descripción

## Instalación


## Correr en dev

1. Clonar el repositorio
2. Crear copia del ``` env.template ``` y renombrarlo a ``` .env ``` y cambiar las variables de entorno
3. Instalar dependencias ``` npm install ```
4. Levantar la base de datos ``` docker compose up -d ```
5. Ejecutar el seed ``` npm run seed ```
6. Correr las migraciones de Prisma ``` npx prisma migrate dev ```
7. Correr el proyecto ``` npm run dev ```


## Correr en prod