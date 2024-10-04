import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: 1;
};

export const fetchTodos = createAsyncThunk<Todo[]>(
  "todos/fetchTodos",
  async function () {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/todos`);

    return resp.json();
  }
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async function (todo: Omit<Todo, "id">, {dispatch}) {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: "POST",
      body: JSON.stringify({
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if(!resp.ok){
      throw new Error("cant add todo. Server error")
    }

      const data = await resp.json()

      dispatch(addTodo(todo))
  
  
  }
);

interface TodosState {
  todos: Todo[];
  status: string;
  error: string;
}

const initialState: TodosState = {
  todos: [],
  status: "",
  error: "",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action){
      state.todos = [action.payload, ...state.todos]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });

    builder.addCase(fetchTodos.rejected, (state) => {
      state.status = "rejected";
      state.error = "failed to add tasks, server error";
    });
  },
});

export const {addTodo} = todoSlice.actions;

const todoReduser = todoSlice.reducer;

export default todoReduser;
