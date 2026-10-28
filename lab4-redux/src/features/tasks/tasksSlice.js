import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 't-1', title: 'Проверить Redux store', description: 'Убедиться, что оба слайса подключены.', done: true },
    { id: 't-2', title: 'Проверить адаптивность', description: 'Открыть интерфейс на узком экране.', done: false },
  ],
  error: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action) { state.items.push(action.payload); state.error = ''; },
      prepare(data) { return { payload: { id: nanoid(), ...data, done: false } }; },
    },
    taskUpdated(state, action) {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (!task) { state.error = 'Задача не найдена.'; return; }
      Object.assign(task, action.payload.changes); state.error = '';
    },
    taskDeleted(state, action) {
      if (!state.items.some((item) => item.id === action.payload)) { state.error = 'Задача не найдена.'; return; }
      state.items = state.items.filter((item) => item.id !== action.payload); state.error = '';
    },
    tasksErrorSet(state, action) { state.error = action.payload; },
    tasksErrorCleared(state) { state.error = ''; },
  },
});

export const { taskAdded, taskUpdated, taskDeleted, tasksErrorSet, tasksErrorCleared } = tasksSlice.actions;
export default tasksSlice.reducer;