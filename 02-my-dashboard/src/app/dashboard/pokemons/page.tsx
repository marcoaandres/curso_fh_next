// prc

import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons/";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata = {
  title: 'Página principal de los Pokemons',
  description: 'Descripción de la página principal de los Pokemons',
 };

// El tipado será una promesa que va a responder un arreglo de simplePokemon
//la data sera PokemonsResponse
const getPokemons = async (limit = 50, offset = 0):Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(res => res.json())

    const pokemons = data.results.map( pokemon => ({
      // el id viene como parte de la url por eso hacemos el split
      // con el ! indicamos que siempre va a venir
      id: pokemon.url.split('/').at(-2)!,
      name: pokemon.name
    }))

    // * simulacion de error del lado del servidor, (no debería pasar)
    // throw new Error('Error al cargar la página')

    // !TODO:
    // * next permite redireccionar a una pantalla de no encontrado
    // throw notFound()

    return pokemons

}

export default async function PokemonsPage() {

  const pokemons = await getPokemons()
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">Listado de Pokémons <small className="text-blue-500">estático</small></span>
        <PokemonGrid pokemons={pokemons} />
    </div>
  );
}