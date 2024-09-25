import React, { createRef, RefObject } from "react";
import "../styles/TodoHeader.css";
import { addTodo, Todo } from "../service/todo";

export default class TodoHeader extends React.Component<{
  onAddedTodo: (todo: Todo) => void;
}> {
  inputRef: RefObject<HTMLInputElement> = createRef();

  addTodoFromFetch = () => {
    if (!this.inputRef.current) {
      return;
    }
    addTodo({
      title: this.inputRef.current.value,
      completed: false,
      userId: 1,
    }).then(this.props.onAddedTodo);

    this.inputRef.current.value = "";
  };

  render(): React.ReactNode {
    return (
      <div className="header-main-box">
        <h1 className="header-title">Todo list</h1>

        <div className="header-actions-box">
          <input
            className="header-input"
            type="text"
            placeholder="Например: погладить кота"
            ref={this.inputRef}
          />
          <button className="header-btn" onClick={this.addTodoFromFetch}>
            Добавить
          </button>
        </div>
      </div>
    );
  }
}
