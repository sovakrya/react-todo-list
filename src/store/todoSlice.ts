import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: 1;
  documentId: string
};

type Data = {
  data: Todo[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export const fetchTodos = createAsyncThunk<Data, void, { rejectValue: string }>(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const resp = await fetch(`${process.env.REACT_APP_BACKEND}api/todos`);
      if (!resp.ok) {
        throw new Error("SERVER_ERROR");
      }

      return resp.json();
    } catch (error) {
      let msg: string;
      if (error instanceof Error) {
        msg = error.message;
      } else {
        msg = String(error);
      }

      return rejectWithValue(msg);
    }
  }
);

export const addNewTodo = createAsyncThunk<
  void,
  Omit<Todo, "id" | "documentId">,
  { rejectValue: string }
>(
  "todos/addNewTodo",

  async function (todo: Omit<Todo, "id" | "documentId">, { dispatch, rejectWithValue }) {
    try {
      const resp = await fetch(`${process.env.REACT_APP_BACKEND}api/todos`, {
        method: "POST",
        body: JSON.stringify({
          data: {
            title: todo.title,
            completed: todo.completed,
            userId: todo.userId,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!resp.ok) {
        throw new Error("cant add todo. Server error");
      }

      const data = await resp.json();
      dispatch(addTodo(data.data));
    } catch (err) {
      let msg: string;
      if (err instanceof Error) {
        msg = err.message;
      } else {
        msg = String(err);
      }

      return rejectWithValue(msg);
    }
  }
);

export const updateTodoFetch = createAsyncThunk<
  void,
  Todo,
  { rejectValue: string }
>(
  "todos/updateTodoFetch",
  async function (todo: Todo, { dispatch, rejectWithValue }) {
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_BACKEND}api/todos/${todo.documentId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            data: {
              title: todo.title,
              completed: todo.completed,
              userId: todo.userId,
            },
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!resp.ok) {
        throw new Error("cant update todo. Server error");
      }

      const data = await resp.json()

      dispatch(updateTodo(data.data));
      
    } catch (err) {
      let msg: string;
      if (err instanceof Error) {
        msg = err.message;
      } else {
        msg = String(err);
      }

      return rejectWithValue(msg);
    }
  }
);

export const removeTodo = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>(
  "todo/removeTodo",

  async function (documentId: string, { dispatch, rejectWithValue }) {
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_BACKEND}api/todos/${documentId}`,
        {
          method: "DELETE",
        }
      );

      if (!resp.ok) {
        throw new Error("cant remove todo. Server error");
      }

      dispatch(deleteTodo(documentId));
    } catch (err) {
      let msg: string;
      if (err instanceof Error) {
        msg = err.message;
      } else {
        msg = String(err);
      }

      return rejectWithValue(msg);
    }
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
    addTodo(state, action) {
      state.todos = [action.payload, ...state.todos];
    },

    updateTodo(state, action) {
      const idx = state.todos.findIndex(
        (todo) => todo.documentId === action.payload.documentId
      );
      state.todos[idx] = action.payload;
    },

    deleteTodo(state, action) {
      const idx = state.todos.findIndex((todo) => todo.documentId === action.payload);

      state.todos.splice(idx, 1);
    },

    deleteAllTodo(state) {
      state.todos = [];
    },

    completeAllTodo(state) {
      state.todos.map((todo) => {
        return (todo.completed = true);
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "resolved";
      state.todos = action.payload.data;
    });
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload) {
        state.error = action.payload;
      }
    });

    builder.addCase(addNewTodo.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload) {
        state.error = action.payload;
      }
    });

    builder.addCase(updateTodoFetch.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload) {
        state.error = action.payload;
      }
    });

    builder.addCase(removeTodo.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
  completeAllTodo,
} = todoSlice.actions;

const todoReduser = todoSlice.reducer;

export default todoReduser;
