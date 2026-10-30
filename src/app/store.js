import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import tasksReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    tasks: tasksReducer,
  },
});
