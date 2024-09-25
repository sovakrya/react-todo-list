import React, { useState } from "react";
import "../styles/TodoHeader.css";
import { addTodo, Todo } from "../service/todo";

export default function TodoHeader(props: {
  onAddedTodo: (todo: Todo) => void;
}) {
  const [todoTitle, setTodoTitle] = useState("");

  const addTodoFromFetch = () => {
    if (!todoTitle) {
      return;
    }
    addTodo({
      title: todoTitle,
      completed: false,
      userId: 1,
    }).then(props.onAddedTodo);

    setTodoTitle("");
  };

  return (
    <div className="header-main-box">
      <h1 className="header-title">Todo list</h1>

      <div className="header-actions-box">
        <input
          className="header-input"
          type="text"
          placeholder="Например: погладить кота"
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button className="header-btn" onClick={addTodoFromFetch}>
          Добавить
        </button>
      </div>
    </div>
  );
}
