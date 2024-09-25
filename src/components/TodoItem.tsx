import { createRef, RefObject, useState } from "react";
import { deleteTodo, Todo, updateTodo } from "../service/todo";
import "../styles/TodoItem.css";

export default function TodoItem(props: {
  todo: Todo;
  onCompletedTodo: (todo: Todo) => void;
  onUpdateTodo: (todo: Todo) => void;
  onDeleteTodo: (todoId: number) => void;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");

  function completedTodoFromFetch() {
    updateTodo({
      id: props.todo.id,
      title: props.todo.title,
      completed: !props.todo.completed,
      userId: props.todo.userId,
    }).then(props.onCompletedTodo);
  }

  function updateTodoFromFetch() {
    updateTodo({
      id: props.todo.id,
      title: todoTitle,
      completed: props.todo.completed,
      userId: props.todo.userId,
    }).then(props.onUpdateTodo);

    setIsEdit(false);
  }

  function deleteTodoFromFetch() {
    deleteTodo(props.todo.id).then(() => props.onDeleteTodo(props.todo.id));
  }

  return (
    <div className="todo-main-box">
      <input
        type="checkbox"
        checked={props.todo.completed}
        onClick={completedTodoFromFetch}
      />
      {!isEdit ? (
        <span
          className={`todo-title${props.todo.completed ? " todo-title-completed" : ""}`}
        >
          {props.todo.title}
        </span>
      ) : (
        <input
          type="text"
          className="todo-input"
          onChange={(e) => setTodoTitle(e.target.value)}
        />
      )}

      {!isEdit ? (
        <div className="todo-actions-box">
          <button className="todo-btn" onClick={() => setIsEdit(true)}>
            Редактировать
          </button>
          <button className="todo-btn" onClick={deleteTodoFromFetch}>
            Выполнить
          </button>
        </div>
      ) : (
        <div className="todo-actions-box">
          <button className="todo-btn" onClick={() => setIsEdit(false)}>
            Отменить
          </button>
          <button className="todo-btn" onClick={updateTodoFromFetch}>
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
}
