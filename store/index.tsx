import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../stores/slices/cartSlice";

// Configuração do store global do Redux
// Adicionando o reducer do carrinho
export const store = configureStore({
  reducer: {
    cart: cartReducer, // reducer do carrinho
  },
});

// Tipos para uso com hooks do Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;