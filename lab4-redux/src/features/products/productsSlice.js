import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 'p-1', name: 'Механическая клавиатура', category: 'Периферия', price: 6490, stock: 12 },
    { id: 'p-2', name: 'Беспроводная мышь', category: 'Периферия', price: 2890, stock: 24 },
    { id: 'p-3', name: 'USB-C концентратор', category: 'Аксессуары', price: 4190, stock: 8 },
  ],
  error: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productAdded: {
      reducer(state, action) { state.items.push(action.payload); state.error = ''; },
      prepare(data) { return { payload: { id: nanoid(), ...data } }; },
    },
    productUpdated(state, action) {
      const item = state.items.find((product) => product.id === action.payload.id);
      if (!item) { state.error = 'Элемент не найден.'; return; }
      Object.assign(item, action.payload.changes); state.error = '';
    },
    productDeleted(state, action) {
      const exists = state.items.some((item) => item.id === action.payload);
      if (!exists) { state.error = 'Не удалось удалить: элемент не найден.'; return; }
      state.items = state.items.filter((item) => item.id !== action.payload); state.error = '';
    },
    productsErrorSet(state, action) { state.error = action.payload; },
    productsErrorCleared(state) { state.error = ''; },
  },
});

export const { productAdded, productUpdated, productDeleted, productsErrorSet, productsErrorCleared } = productsSlice.actions;
export default productsSlice.reducer;