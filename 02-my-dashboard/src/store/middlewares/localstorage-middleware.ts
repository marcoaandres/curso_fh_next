import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";


export const localStorageMiddleware = (state: MiddlewareAPI) => {
    // este middleware regresa una funcion que a su vez regresa otra funcion
    // cuando mandemos a despachar una acción el middleware lo interceptara en este punto
    // retornaremos la acción realizada ya interceptada
  return (next: Dispatch) => (action: Action) => {

    // se despacha la accion
    next(action);

    // intercepcion de acciones
    if(action.type === 'pokemons/toggleFavorite'){
        //as RootState solo es tipado para que nos aparescan counter y pokemons
        const { pokemons } = state.getState() as RootState;
        localStorage.setItem('favorite-pokemons', JSON.stringify( pokemons ));
        return;
    }
  }
}
