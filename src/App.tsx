import { useEffect, useState } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoItem from "./components/TodoItem";
import { getTodos, Todo } from "./service/todo";
import { fetchTodos } from "./store/todoSlice";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

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

export default function App() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const { status, error } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  function completedAllTodos() {
    // const tempTodos = [...todos];
    // tempTodos.map((todo) => {
    //   return (todo.completed = true);
    // });
    // setTodos(tempTodos);
  }

  return (
    <AppMainBox>
      <TodoHeader />

      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      {todos.length ? (
        <TodoListBox>
          <TodoListActionsBox>
            <TodoListBtn>Отметить все!</TodoListBtn>
            <TodoListBtn>Выполнить все!</TodoListBtn>
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
}
