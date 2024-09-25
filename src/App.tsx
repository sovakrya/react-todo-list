import React from "react";
import "./App.css";
import TodoHeader from "./components/TodoHeader";
import TodoItem from "./components/TodoItem";
import { getTodos, Todo } from "./service/todo";

export default class App extends React.Component {
  state: Readonly<{
    todos: Todo[];
  }> = {
    todos: [],
  };

  getTodosFromFetch = () => {
    getTodos().then((res) => {
      this.setState({
        todos: res,
      });
    });
    return this.state.todos;
  };

  onAddedTodo = (todo: Todo) => {
    const todos = [...this.state.todos, todo];
    this.setState({
      todos,
    });
  };

  render(): React.ReactNode {
    return (
      <div className="app-main-box">
        <TodoHeader onAddedTodo={this.onAddedTodo} />

        <div>
          <div>
            <button>Отметить все!</button>
            <button>Выполнить все!</button>
          </div>

          <div>
            {this.state.todos.map((todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
