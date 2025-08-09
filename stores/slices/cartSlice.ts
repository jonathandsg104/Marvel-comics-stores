import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comic } from '../../utils/sample-data';

// Tipo para um item do carrinho
export interface CartItem {
  comic: Comic;
  quantity: number;
}

// Estado inicial do carrinho
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// Slice do carrinho
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adiciona uma HQ ao carrinho
    addToCart: (state, action: PayloadAction<Comic>) => {
      const existing = state.items.find(item => item.comic.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ comic: action.payload, quantity: 1 });
      }
    },
    // Remove uma HQ do carrinho
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.comic.id !== action.payload);
    },
    // Altera a quantidade de uma HQ
    setQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.comic.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    // Limpa o carrinho
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
