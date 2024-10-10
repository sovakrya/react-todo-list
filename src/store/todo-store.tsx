import { makeAutoObservable, runInAction } from "mobx";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../service/todo";
import { Todo } from "../service/todo";

class TodoStore {
  todos: Todo[] = [];
  state: "pending" | "done" | "error" = "pending";

  constructor() {
    makeAutoObservable(this);
  }

  getTodosAction = async () => {
    try {
      const res = await getTodos();

      runInAction(() => {
        this.todos = res.data;
        this.state = "done";
      });
    } catch {
      this.state = "error";
    }
  };

  addTodoAction = async (todo: Omit<Todo, "id" | "documentId">) => {
    try {
      const res = await addTodo(todo);

      runInAction(() => {
        this.todos = [res.data, ...this.todos];
      });
    } catch {}
  };

  updateTodoAction = async (todo: Todo) => {
    try {
      const res = await updateTodo(todo);
      runInAction(() => {
        const idx = this.todos.findIndex(
          (val) => val.documentId === res.data.documentId
        );

        this.todos[idx] = res.data;
      });
    } catch {}
  };

  removeTodoAction = async (documentId: string) => {
    try {
      deleteTodo(documentId);

      runInAction(() => {
        const idx = this.todos.findIndex(
          (val) => val.documentId === documentId
        );

        this.todos.splice(idx, 1);
      });
    } catch {}
  };
}

export default new TodoStore();
