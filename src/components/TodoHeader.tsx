import React, { createRef, MutableRefObject, RefObject, useRef } from "react";
import "../styles/TodoHeader.css";
import { addTodo, Todo } from "../service/todo";

export default function TodoHeader(onAddedTodo: (todo: Todo) => void) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodoFromFetch = () => {
    if (!inputRef.current) {
      return;
    }
    addTodo({
      title: inputRef.current.value,
      completed: false,
      userId: 1,
    }).then(onAddedTodo);

    inputRef.current.value = "";
  };

  return (
    <div className="header-main-box">
      <h1 className="header-title">Todo list</h1>

      <div className="header-actions-box">
        <input
          className="header-input"
          type="text"
          placeholder="Например: погладить кота"
          ref={inputRef}
        />
        <button className="header-btn" onClick={addTodoFromFetch}>
          Добавить
        </button>
      </div>
    </div>
  );
}
