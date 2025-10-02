import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h2>List of Tasks</h2>
      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tasks to finish?"
          className="todo-input"
        />
        <button type="submit" className="todo-button">Add</button>
      </form>
      <ul className="todo-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`todo-item ${task.completed ? 'completed' : ''}`}
            onClick={() => handleToggleComplete(task.id)}
          >
            {task.text}
            <button onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }} className="delete-button">
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;