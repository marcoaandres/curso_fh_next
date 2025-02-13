import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// custom hooks de redux para hacer dispatch de acciones y para saber como esta el state

// Use throughout your app instead of plain `useDispatch`(hook para hacer dispatch de acciones) and `useSelector`(hook para tomar y escuchar nuestro state para cuando cambia redibujar el componente) 
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
