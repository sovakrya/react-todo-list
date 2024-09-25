import React from "react";
import TodoItem from "./TodoItem";

export default class TodoList extends React.Component {

    render(): React.ReactNode {
        return <div>
            <div>
                <button>Отметить все!</button>
                <button>Выполнить все!</button>
            </div>

            <TodoItem />
        </div>
    }
}