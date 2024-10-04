import React, { useState } from "react";
import { addTodo, Todo } from "../service/todo";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addNewTodo } from "../store/todoSlice";

const HeaderMainBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 6px 6px 12px rgb(199, 199, 199);
  align-items: center;
  width: 500px;
`;

const HeaderTitle = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const HeaderAcrionsBox = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
`;

const HeadetInput = styled.input`
  flex-grow: 1;
  height: 28px;
  border: solid 1px rgb(180, 180, 180);
  border-radius: 5px;
`;

const HeaderBtn = styled.button`
  background: none;
  border-radius: 5px;
  border: solid 2.5px rgb(162, 92, 209);
  cursor: pointer;
  font-size: 14px;
  transition: ease-in-out 0.5s;

  &:hover {
    background-color: rgb(162, 92, 209);
    color: aliceblue;
  }
`;

export default function TodoHeader() {
  const [todoTitle, setTodoTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>()

  function addTodoFromFetch(){
    if(!todoTitle){
      return
    }
    dispatch(addNewTodo({completed: false, title: todoTitle, userId: 1}))   
    setTodoTitle("")
  }


  return (
    <HeaderMainBox>
      <HeaderTitle>Todo list</HeaderTitle>

      <HeaderAcrionsBox>
        <HeadetInput
          type="text"
          placeholder="Например: погладить кота"
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <HeaderBtn onClick={addTodoFromFetch}>Добавить</HeaderBtn>
      </HeaderAcrionsBox>
    </HeaderMainBox>
  );
}
