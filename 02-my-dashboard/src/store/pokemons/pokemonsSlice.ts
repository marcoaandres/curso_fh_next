import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SimplePokemon } from '@/pokemons';

/*
    Para crear el arreglo de favoritos:
    Podriamos crear un arreglo con los pokemos dentro del siguiente modo:
    [ {}, {}, {} ]

    pero para este caso utilizaremos un arreglo con el id del pokemon como llave y el arreglo de pokemon como valor

    {
        '1': { id: 1, name: 'bulbasaur'},
        '2': { id: 2, name: 'ivysaur'},
        '3': { id: 3, name: 'venusaur'},
        ...
    }
*/

interface PokemonsState{
    // llave dinamica de tipo string que apunta a un pokemon
    [key: string]: SimplePokemon
}

// trabajando con localStorage
// esto sí se puede hacer pero marcará un error al hacer el npm run build
const getInitialState = () :PokemonsState => {
    // Posible solución
    // agregar una validación para que valide que ya cargo el localStorage
    if( typeof localStorage === 'undefined' ) return {};

    const favorites = JSON.parse( localStorage.getItem('favorite-pokemons') || '{}' );

    return favorites;
}

const initialState: PokemonsState = {
    ...getInitialState(),

    // '1': { id: '1', name: 'bulbasaur'},
    // '6': { id: '6', name: 'charizard'},
    // '9': { id: '9', name: 'blastoise'},
}
const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {

    toggleFavorite(state, action: PayloadAction<SimplePokemon>){
        const pokemon = action.payload;
        const {id} = pokemon;

        if( state[id] ){
            delete state[id];
            //return;
        }else{
            state[id] = pokemon;
        }

        //En Redux esto no se debería hacer porque una acción no debe tener interacción con el mundo exterior, deben ser funciones puras, no deben ser aincornas y deben regresar un nuevo estado.
        // si lo suigiente falla osea si la grabacion en localStorage falla, fallaría nuestra mutación, cambio de state, etc.
        localStorage.setItem('favorite-pokemons', JSON.stringify( state ));

    }
  },



  
});

export const {
    toggleFavorite,
} = pokemonsSlice.actions

export default pokemonsSlice.reducer