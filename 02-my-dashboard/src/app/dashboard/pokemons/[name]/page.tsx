import { Metadata } from 'next';
import { Pokemon } from '../../../../pokemons/interfaces/pokemon';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PokemonsResponse } from '@/pokemons';
// prc

// * Para generar la meta data en una pagina dinamica y que sea generada en el servidor debemos usar
// aquí volvemos a utilizar la peticion getPokemon sin embargo no afecta ya que como estamos usando next solo se hace 1 vez la petición http y se guarda en cache la segunda vez se hace la petición pero al resultado de la cache, adicional esto se hace en la parte del servidor y el usuario no tiene problemas con el performarce
export async function generateMetadata({params}:Props): Promise<Metadata> {
  
  // validacion para tratar de generar la metadata
  try {
    const { id, name } = await getPokemon(params.name)

    return{
      title: `#${id} - ${name}`,
      description: `Página del pokémon ${name}`
    }
  } catch (error) {
    // Meta data por default si falla algo
    return {
      title: 'Página del pokémon',
      description: 'Descripción por default para el pokémon'
    }
  }

}

// * por default en los props se reciben los params y los searchParams, por default todos los params son de tipo string
// no se veran en el cliente sino del lado del servidor
const getPokemon = async(name: string): Promise<Pokemon> => {

  // validación para tratar de generar la página del pokemon solicitado
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    // se guarda la peticion en cache
    cache: 'force-cache',
    // revalidacion cada 6 meses de la página
    // next:{
    //   revalidate: 60 * 60 * 24 * 30 * 6
    // }
  }).then( resp => resp.json())

  console.log("se cargo la info de: ", pokemon.name)

  return pokemon

  } catch (error) {
    // si falla la generación de la página redireccionamos a la página not found
    // envia a la pagina diseñada dentro de esta carpeta /url
    // función de nextnavigation
    notFound()
  }
  
}



  // gsp
    // estas paginas estaticas se generan en tiempo de construccion (build time) cuando se ejecuta el comando npm build
  // se mantendran así por el tiempo definido hasta que se revaliden
  // si un usuario solicita la pagina 151 + 5 que es una página que aún no esta generada, el servidor la construira y guardará para que el proximo en solicitar esa misma página ya estará generada y cargará de forma más rapida
  // funcion que genera paginas estaticas en el servidor

  // * debemos parar la consola
  // ejecutar npm run build, la consola nos indicara que se crearon estas 151 paginas
  //  y volver a levantar
  // podemos revisar la carpeta de .next/server/app/dashboard/pokemons aquí veremos las 151 paginas generadas
  export async function generateStaticParams() {
    
    // creacion de arreglo de 15 pokemons
  // crea un arreglo apartir de algo(por ejemplo un objeto)
  
  const data: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=15`)
    .then(res => res.json())

    // arreglo de objetos
    /**
     [
        { name: 'bulbasaur' },
        { name: 'ivysaur' },
      ]
     */

    const static15Pokemons = data.results.map( pokemon => ({
      name: pokemon.name
    }))

    return static15Pokemons
  }

  interface Props{
    params: { name: string}
  }

export default async function PokemonPage({ params }: Props) {



  const pokemon = await getPokemon(params.name);
  

  return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ''}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />


            <div className="flex flex-wrap">
              {
                pokemon.moves.map(move => (
                  <p key={move.move.name} className="mr-2 capitalize">{move.move.name}</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {
                pokemon.types.map(type => (
                  <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {
                pokemon.weight
              }
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>



        </div>
      </div>
    </div>
  );
}