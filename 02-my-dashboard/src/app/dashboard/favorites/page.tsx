import { FavoritePokemons } from "@/pokemons";

// Meta data para nuestro seo friendly
export const metadata = {
  title: 'Favorite Pokemons',
  description: 'Tus pokemons favoritos',
 };

export default function FavoritePokemonPage(){
  
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2"> Pokémons Favoritos <small className="text-blue-500">Global State</small></span>
      <FavoritePokemons/>
    </div>
  );
}
