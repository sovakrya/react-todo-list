import React, { createRef, RefObject } from "react";
import { deleteTodo, Todo, updateTodo } from "../service/todo";
import "../styles/TodoItem.css";
export default class TodoItem extends React.Component<{
  todo: Todo;
  onCompletedTodo: (todo: Todo) => void;
  onUpdateTodo: (todo: Todo) => void;
  onDeleteTodo: (todoId: number) => void;
}> {
  completedTodoFromFetch = () => {
    updateTodo({
      id: this.props.todo.id,
      title: this.props.todo.title,
      completed: !this.props.todo.completed,
      userId: this.props.todo.userId,
    }).then(this.props.onCompletedTodo);
  };

  inputTodoRef: RefObject<HTMLInputElement> = createRef();

  state: Readonly<{
    isEdit: boolean;
  }> = {
    isEdit: false,
  };

  updateTodoFromFetch = () => {
    updateTodo({
      id: this.props.todo.id,
      title: this.inputTodoRef.current!.value,
      completed: this.props.todo.completed,
      userId: this.props.todo.userId,
    }).then(this.props.onUpdateTodo);

    this.setState({
      isEdit: false,
    });
  };

  deleteTodoFromFetch = () => {
    deleteTodo(this.props.todo.id).then(() =>
      this.props.onDeleteTodo(this.props.todo.id)
    );
  };

  render(): React.ReactNode {
    return (
      <div className="todo-main-box">
        <input
          type="checkbox"
          checked={this.props.todo.completed}
          onClick={this.completedTodoFromFetch}
        />
        {!this.state.isEdit ? (
          <span
            className={`todo-title${this.props.todo.completed ? " todo-title-completed" : ""}`}
          >
            {this.props.todo.title}
          </span>
        ) : (
          <input type="text" className="todo-input" ref={this.inputTodoRef} />
        )}

        {!this.state.isEdit ? (
          <div className="todo-actions-box">
            <button
              className="todo-btn"
              onClick={() => this.setState({ isEdit: true })}
            >
              Редактировать
            </button>
            <button className="todo-btn" onClick={this.deleteTodoFromFetch}>
              Выполнить
            </button>
          </div>
        ) : (
          <div className="todo-actions-box">
            <button
              className="todo-btn"
              onClick={() => this.setState({ isEdit: false })}
            >
              Отменить
            </button>
            <button className="todo-btn" onClick={this.updateTodoFromFetch}>
              Сохранить
            </button>
          </div>
        )}
      </div>
    );
  }
}
