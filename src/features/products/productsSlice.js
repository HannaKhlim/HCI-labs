import { createSlice } from "@reduxjs/toolkit";
import initialProducts from "../../data/products.json";

const productsSlice = createSlice({
  name: "products",
  initialState: { items: initialProducts, error: null },
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      if (!product.name?.trim() || !product.brand?.trim()) {
        state.error = "Название и бренд обязательны";
        return;
      }
      if (!Number.isFinite(Number(product.price)) || Number(product.price) <= 0) {
        state.error = "Цена должна быть положительным числом";
        return;
      }
      state.items.unshift({ ...product, id: product.id ?? Date.now(), price: Number(product.price), image: product.image || "/photos/placeholder.jpg" });
      state.error = null;
    },
    updateProduct(state, action) {
      const product = action.payload;
      const index = state.items.findIndex((item) => String(item.id) === String(product.id));
      if (index < 0) { state.error = "Товар не найден"; return; }
      if (!product.name?.trim() || !product.brand?.trim() || !Number.isFinite(Number(product.price)) || Number(product.price) <= 0) {
        state.error = "Проверьте название, бренд и положительную цену";
        return;
      }
      state.items[index] = { ...product, price: Number(product.price) };
      state.error = null;
    },
    deleteProduct(state, action) {
      state.items = state.items.filter((item) => String(item.id) !== String(action.payload));
      state.error = null;
    },
    clearProductError(state) { state.error = null; },
  },
});

export const { addProduct, updateProduct, deleteProduct, clearProductError } = productsSlice.actions;
export default productsSlice.reducer;
