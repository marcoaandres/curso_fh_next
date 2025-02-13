// prc

import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons/";

export default async function PokemonPage() {

  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2"> Pokémons Favoritos <small className="text-blue-500">Global State</small></span>
        <PokemonGrid pokemons={[]} />
    </div>
  );
}