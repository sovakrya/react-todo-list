import { configureStore } from "@reduxjs/toolkit";
import  todoReduser  from "./todoSlice";

const store = configureStore({
  reducer: {
    todos: todoReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>
export default store
export type AppDispatch = typeof store.dispatch

