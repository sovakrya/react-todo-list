import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Todo = {
    id: number;
    title: string;
    completed: boolean;
    userId: 1;
  };

export const fetchTodos = createAsyncThunk<Todo[]>(
  "todos/fetchTodos",
  async function ()  {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    return resp.json()
  }
);

interface TodosState {
    todos: Todo[],
    status: string,
    error: string
  }

  const initialState: TodosState = {
    todos: [],
    status: "",
    error: ""
  }

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action){

    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "resolved"
        state.todos = action.payload
    })
    builder.addCase(fetchTodos.pending, (state) => {
        state.status = "loading"
        state.error = ""
    })
  }
});


export const {addTodo} = todoSlice.actions

const todoReduser = todoSlice.reducer

export default todoReduser