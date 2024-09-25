import React from 'react';
import './App.css';
import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

export default class App extends React.Component {
   

  render(): React.ReactNode {
    return <div className='app-main-box'>
      <TodoHeader />
      <TodoList />
    </div>
    
  }
}