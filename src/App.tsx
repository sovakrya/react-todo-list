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

  componentDidMount(): void {
    this.getTodosFromFetch();
  }

  onAddedTodo = (todo: Todo) => {
    const todos = [todo, ...this.state.todos];
    this.setState({
      todos,
    });
  };

  onCompletedTodo = (todo: Todo) => {
    const todos = [...this.state.todos];
    const idx = todos.findIndex((i) => i.id === todo.id);
    todos[idx] = todo;

    this.setState({
      todos,
    });
  };

  onUpdateTodo = (todo: Todo) => {
    const todos = [...this.state.todos];
    const idx = todos.findIndex((i) => i.id === todo.id);
    todos[idx] = todo;

    this.setState({
      todos,
    });
  };

  onDeleteTodo = (todoId: number) => {
    const todos = [...this.state.todos];
    const idx = todos.findIndex((i) => i.id === todoId);
    todos.splice(idx, 1);

    this.setState({
      todos,
    });
  };

  render(): React.ReactNode {
    return (
      <div className="app-main-box">
        <TodoHeader onAddedTodo={this.onAddedTodo} />

        <div className="todo-list-box">
          <div className="todo-list-actions-box">
            <button className="todo-list-btn">Отметить все!</button>
            <button className="todo-list-btn">Выполнить все!</button>
          </div>

          <div className="todo-item-wrapper">
            {this.state.todos.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onCompletedTodo={this.onCompletedTodo}
                onUpdateTodo={this.onUpdateTodo}
                onDeleteTodo={this.onDeleteTodo}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
