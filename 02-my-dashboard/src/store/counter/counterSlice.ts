import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    count: number;
    isready: boolean;
}

const initialState: CounterState = {
    count: 5,
    // se agrega para poder recibir del back una información sin generar bucles
    isready: false,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // acciones que queremos mandar a llamar desde cualquier parte de la aplicación para modificar el state

    // reducer iniciador para recibir datos del back
    initCounterState(state, action: PayloadAction<number>){
      if(state.isready) return;

      // rompemos con el bucle generado 
      state.count = action.payload;
      state.isready = true;
    },
    addOne(state){
      state.count++;
    },
    substractOne(state){
      state.count--;
    },
    resetCount(state, action: PayloadAction<number>){
      if(action.payload < 0) action.payload = 0;

      state.count = action.payload;
    }

  }
});

export const { 
  initCounterState,
  addOne,
  substractOne,
  resetCount,
 } = counterSlice.actions;
export default counterSlice.reducer;