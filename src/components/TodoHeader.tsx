import React from "react";
import "../styles/TodoHeader.css"

export default class TodoHeader extends React.Component {

    render(): React.ReactNode {
        return <div className="header-main-box">
            <h1 className="header-title">Todo list</h1>

            <div className="header-actions-box">
                <input className="header-input" type="text" placeholder="Например: погладить кота"/>
                <button className="header-btn">Добавить</button>
            </div>
        </div>
    }
}