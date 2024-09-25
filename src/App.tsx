import { useEffect, useState } from "react";
import "./App.css";
import TodoHeader from "./components/TodoHeader";
import TodoItem from "./components/TodoItem";
import { getTodos, Todo } from "./service/todo";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function getTodosFromFetch() {
    getTodos().then((res) => {
      setTodos(res);
    });

    return todos;
  }

  useEffect(() => {
    getTodosFromFetch();
  }, []);

  function onAddedTodo(todo: Todo) {
    setTodos([todo, ...todos]);
  }

  function onCompletedTodo(todo: Todo) {
    const tempTodos = [...todos];
    const idx = tempTodos.findIndex((i) => i.id === todo.id);
    tempTodos[idx] = todo;

    setTodos(tempTodos);
  }

  function onUpdateTodo(todo: Todo) {
    const tempTodos = [...todos];
    const idx = tempTodos.findIndex((i) => i.id === todo.id);
    tempTodos[idx] = todo;

    setTodos(tempTodos);
  }

  function onDeleteTodo(todoId: number) {
    const tempTodos = [...todos];
    const idx = tempTodos.findIndex((i) => i.id === todoId);
    tempTodos.splice(idx, 1);

    setTodos(tempTodos);
  }

  function completedAllTodos() {
    const tempTodos = [...todos];

    tempTodos.map((todo) => {
      return (todo.completed = true);
    });

    setTodos(tempTodos);
  }

  return (
    <div className="app-main-box">
      <TodoHeader onAddedTodo={onAddedTodo} />

      {todos.length ? (
        <div className="todo-list-box">
          <div className="todo-list-actions-box">
            <button className="todo-list-btn" onClick={completedAllTodos}>
              Отметить все!
            </button>
            <button className="todo-list-btn" onClick={() => setTodos([])}>
              Выполнить все!
            </button>
          </div>

          <div className="todo-item-wrapper">
            {todos.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onCompletedTodo={onCompletedTodo}
                onDeleteTodo={onDeleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
