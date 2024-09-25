import React from "react";
import { Todo } from "../service/todo";
import "../styles/TodoItem.css";

export default class TodoItem extends React.Component<{ todo: Todo }> {
  render(): React.ReactNode {
    return <div className="todo-main-box"></div>;
  }
}
