import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: [], error: null },
  reducers: {
    addTask(state, action) {
      const title = action.payload?.title?.trim();
      if (!title) { state.error = "Название задачи обязательно"; return; }
      state.items.unshift({ id: Date.now(), title, description: action.payload.description?.trim() || "", completed: false });
      state.error = null;
    },
    updateTask(state, action) {
      const index = state.items.findIndex((task) => task.id === action.payload.id);
      if (index < 0) { state.error = "Задача не найдена"; return; }
      const title = action.payload.title?.trim();
      if (!title) { state.error = "Название задачи обязательно"; return; }
      state.items[index] = { ...state.items[index], ...action.payload, title };
      state.error = null;
    },
    deleteTask(state, action) {
      state.items = state.items.filter((task) => task.id !== action.payload);
      state.error = null;
    },
    clearTaskError(state) { state.error = null; },
  },
});

export const { addTask, updateTask, deleteTask, clearTaskError } = tasksSlice.actions;
export default tasksSlice.reducer;
