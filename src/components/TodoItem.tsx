import { useState } from "react";
import styled from "styled-components";
import { removeTodo, Todo, updateTodoFetch } from "../store/todoSlice";
import todoStore from "../store/todo-store";
import { observer } from "mobx-react-lite";

const TodoMainBox = styled.div`
  display: flex;
  gap: 6px;
  padding: 12px;
  border-bottom: solid 1px rgb(139, 111, 137);
`;

const TodoTitle = styled.span`
  font-size: 18px;
  flex-grow: 1;
`;

const TodoTitleComplited = styled(TodoTitle)`
  text-decoration: line-through;
`;

const TodoInput = styled.input`
  flex-grow: 1;
  height: 28px;
  border: solid 1px rgb(180, 180, 180);
  border-radius: 5px;
`;

const TodoActionsBox = styled.div`
  display: flex;
  gap: 6px;
`;

const TodoBtn = styled.button`
  background: none;
  border-radius: 5px;
  border: solid 2.5px rgb(162, 92, 209);
  cursor: pointer;
  font-size: 14px;
  transition: ease-in-out 0.5s;
  align-self: center;

  &:hover {
    background-color: rgb(162, 92, 209);
    color: aliceblue;
  }
`;

export const TodoItem = observer(({ todo }: { todo: Todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const { updateTodoAction, removeTodoAction } = todoStore;

  function completedTodoFromFetch() {
    updateTodoAction({
      completed: !todo.completed,
      id: todo.id,
      title: todo.title,
      userId: todo.userId,
      documentId: todo.documentId,
    });
  }

  function updateTodoFromFetch() {
    updateTodoAction({
      completed: todo.completed,
      id: todo.id,
      title: todoTitle,
      userId: todo.userId,
      documentId: todo.documentId,
    });
    setIsEdit(false);
  }

  function deleteTodoFromFetch() {
    removeTodoAction(todo.documentId);
  }

  return (
    <TodoMainBox>
      <input
        type="checkbox"
        checked={todo.completed}
        onClick={completedTodoFromFetch}
      />
      {!isEdit ? (
        !todo.completed ? (
          <TodoTitle>{todo.title}</TodoTitle>
        ) : (
          <TodoTitleComplited>{todo.title}</TodoTitleComplited>
        )
      ) : (
        <TodoInput type="text" onChange={(e) => setTodoTitle(e.target.value)} />
      )}

      {!isEdit ? (
        <TodoActionsBox>
          <TodoBtn onClick={() => setIsEdit(true)}>Редактировать</TodoBtn>
          <TodoBtn onClick={deleteTodoFromFetch}>Выполнить</TodoBtn>
        </TodoActionsBox>
      ) : (
        <TodoActionsBox>
          <TodoBtn onClick={() => setIsEdit(false)}>Отменить</TodoBtn>
          <TodoBtn onClick={updateTodoFromFetch}>Сохранить</TodoBtn>
        </TodoActionsBox>
      )}
    </TodoMainBox>
  );
});
