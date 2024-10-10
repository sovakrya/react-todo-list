import { useEffect } from "react";
import { TodoHeader } from "./components/TodoHeader";
import { TodoItem } from "./components/TodoItem";
import styled from "styled-components";
import todoStore from "./store/todo-store";
import { observer } from "mobx-react-lite";

const AppMainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const TodoListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 6px 6px 12px rgb(199, 199, 199);
  width: 500px;
`;
const TodoListActionsBox = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  width: 100%;
  padding: 6px;
  border-bottom: solid 2px rgb(139, 111, 137);
`;

const TodoListBtn = styled.button`
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  background-color: rgb(162, 92, 209);
  border: none;
  height: 30px;
  color: rgb(255, 255, 255);
  font-weight: 600;

  &:hover {
    background: none;
    border: solid 2.5px rgb(162, 92, 209);
    color: black;
  }
`;

const TodoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const App = observer(() => {
  const { getTodosAction, todos, removeAllTodoAction, completeAllTodoAction} = todoStore;

  useEffect(() => {
    getTodosAction();
  }, []);

  return (
    <AppMainBox>
      <TodoHeader />

      {todos.length ? (
        <TodoListBox>
          <TodoListActionsBox>
            <TodoListBtn onClick={completeAllTodoAction}>Отметить все!</TodoListBtn>
            <TodoListBtn onClick={removeAllTodoAction}>Выполнить все!</TodoListBtn>
          </TodoListActionsBox>

          <TodoItemWrapper>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </TodoItemWrapper>
        </TodoListBox>
      ) : (
        <></>
      )}
    </AppMainBox>
  );
});
