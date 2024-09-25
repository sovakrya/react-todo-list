import React, { useEffect, useState } from "react";
import "./App.css";
import TodoHeader from "./components/TodoHeader";
import TodoItem from "./components/TodoItem";
import { getTodos, Todo } from "./service/todo";
import { onUpdated } from "vue";

// export default class App extends React.Component {
//   state: Readonly<{
//     todos: Todo[];
//   }> = {
//     todos: [],
//   };

//   getTodosFromFetch = () => {
//     getTodos().then((res) => {
//       this.setState({
//         todos: res,
//       });
//     });
//     return this.state.todos;
//   };

//   componentDidMount(): void {
//     this.getTodosFromFetch();
//   }

//   onAddedTodo = (todo: Todo) => {
//     const todos = [todo, ...this.state.todos];
//     this.setState({
//       todos,
//     });
//   };

//   onCompletedTodo = (todo: Todo) => {
//     const todos = [...this.state.todos];
//     const idx = todos.findIndex((i) => i.id === todo.id);
//     todos[idx] = todo;

//     this.setState({
//       todos,
//     });
//   };

//   onUpdateTodo = (todo: Todo) => {
//     const todos = [...this.state.todos];
//     const idx = todos.findIndex((i) => i.id === todo.id);
//     todos[idx] = todo;

//     this.setState({
//       todos,
//     });
//   };

//   onDeleteTodo = (todoId: number) => {
//     const todos = [...this.state.todos];
//     const idx = todos.findIndex((i) => i.id === todoId);
//     todos.splice(idx, 1);

//     this.setState({
//       todos,
//     });
//   };

//   deleteAllTodos = () => {
//     this.setState({
//       todos: [],
//     });
//   };

//   completedAllTodos = () => {
//     const todos = [...this.state.todos];

//     todos.map((todo) => {
//       return (todo.completed = true);
//     });

//     this.setState({
//       todos,
//     });
//   };

//   render(): React.ReactNode {
//     return (
//       <div className="app-main-box">
//         <TodoHeader onAddedTodo={this.onAddedTodo} />
//         {this.state.todos.length ? (
//           <div className="todo-list-box">
//             <div className="todo-list-actions-box">
//               <button
//                 className="todo-list-btn"
//                 onClick={this.completedAllTodos}
//               >
//                 Отметить все!
//               </button>
//               <button className="todo-list-btn" onClick={this.deleteAllTodos}>
//                 Выполнить все!
//               </button>
//             </div>

//             <div className="todo-item-wrapper">
//               {this.state.todos.map((todo) => (
//                 <TodoItem
//                   todo={todo}
//                   key={todo.id}
//                   onCompletedTodo={this.onCompletedTodo}
//                   onUpdateTodo={this.onUpdateTodo}
//                   onDeleteTodo={this.onDeleteTodo}
//                 />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <></>
//         )}
//       </div>
//     );
//   }
// }

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
  }

  return (
    <div className="app-main-box">
      <TodoHeader onAddedTodo={onAddedTodo} />

      {todos.length ? (
        <div className="todo-list-box">
          <div className="todo-list-actions-box">
            <button className="todo-list-btn" onClick={completedAllTodos}>
              Отметить все!
            </button>
            <button className="todo-list-btn" onClick={() => setTodos([])}>
              Выполнить все!
            </button>
          </div>

          <div className="todo-item-wrapper">
            {todos.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onCompletedTodo={onCompletedTodo}
                onDeleteTodo={onDeleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
