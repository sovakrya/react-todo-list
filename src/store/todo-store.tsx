import { makeAutoObservable, runInAction } from "mobx";
import { addTodo, getTodos } from "../service/todo";
import { Todo } from "../service/todo";

class TodoStore {
  todos: Todo[] = [];
  state: "pending" | "done" | "error"  = "pending"

  constructor() {
    makeAutoObservable(this);
  }

  getTodosAction = async () => {
    try {

      const res = await getTodos();

      runInAction(() => {
        this.todos = res.data;
        this.state = "done"
      });
    } catch {
      this.state = "error"
    }
  };

  addTodoAction = async (todo: Omit<Todo, "id" | "documentId">) => {
    try {
      const res = await addTodo(todo);

      runInAction(() => {
        console.log(res)
        this.todos = [res.data, ...this.todos]
      });
    } catch {}
  };
}

export default new TodoStore();
