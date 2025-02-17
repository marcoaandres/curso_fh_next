'use client';

import { useAppSelector } from '@/store';
import { PokemonGrid } from './PokemonGrid';
import { useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';

export const FavoritePokemons = () => {
    const pokemonsStore = useAppSelector(state => state.pokemons);
    console.log(pokemonsStore);
    
    // Transformamos nuestro objeto a un arreglo
    const favoritePokemons = Object.values(pokemonsStore);
    console.log(favoritePokemons)
    
    // mantener el estado por un tiempo en la página
    const [pokemons, setPokemons] = useState(favoritePokemons);


  return (
    <>
      {
        pokemons.length > 0 
        ? <PokemonGrid pokemons={pokemons} />
        : <NoFavorites/>
        
      }
    </>
  )
}

export const NoFavorites = () => {
  return(
    <div className='flex flex-col h-[50vh] items-center justify-center'>
      <IoHeartOutline size={100} className='text-red-500' />
      <span>No hay favoritos</span>
    </div>

  )
}
