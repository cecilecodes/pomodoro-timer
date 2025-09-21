import React from 'react';
import Timer from './Timer';
import TodoList from './ToDoList';
import './styles.css';

const App = () => {
  return (
    <div className="app-container">
      <h1 className="main-heading">Pomodoro Timer & To-Do List</h1>
      <div className="app-content">
        <Timer />
        <TodoList />
      </div>
    </div>
  );
};

export default App;