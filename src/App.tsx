import { useEffect, useState } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoItem from "./components/TodoItem";
import { getTodos, Todo } from "./service/todo";
import styled from "styled-components";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function getTodosFromFetch() {
    getTodos().then((res) => {
      setTodos(res);
    });

    return todos;
  }

  useEffect(() => {
    getTodosFromFetch();
  }, []);

  function onAddedTodo(todo: Todo) {
    setTodos([todo, ...todos]);
  }

  function onCompletedTodo(todo: Todo) {
    const tempTodos = [...todos];
    const idx = tempTodos.findIndex((i) => i.id === todo.id);
    tempTodos[idx] = todo;

    setTodos(tempTodos);
  }

  function onUpdateTodo(todo: Todo) {
    const tempTodos = [...todos];
    const idx = tempTodos.findIndex((i) => i.id === todo.id);
    tempTodos[idx] = todo;

    setTodos(tempTodos);
  }

  function onDeleteTodo(todoId: number) {
    const tempTodos = [...todos];
    const idx = tempTodos.findIndex((i) => i.id === todoId);
    tempTodos.splice(idx, 1);

    setTodos(tempTodos);
  }

  function completedAllTodos() {
    const tempTodos = [...todos];

    tempTodos.map((todo) => {
      return (todo.completed = true);
    });

    setTodos(tempTodos);
  }

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

  return (
    <AppMainBox>
      <TodoHeader onAddedTodo={onAddedTodo} />

      {todos.length ? (
        <TodoListBox>
          <TodoListActionsBox>
            <TodoListBtn onClick={completedAllTodos}>Отметить все!</TodoListBtn>
            <TodoListBtn onClick={() => setTodos([])}>
              Выполнить все!
            </TodoListBtn>
          </TodoListActionsBox>

          <TodoItemWrapper>
            {todos.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onCompletedTodo={onCompletedTodo}
                onDeleteTodo={onDeleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
            ))}
          </TodoItemWrapper>
        </TodoListBox>
      ) : (
        <></>
      )}
    </AppMainBox>
  );
}
