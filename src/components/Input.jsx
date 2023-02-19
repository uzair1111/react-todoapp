import React, { useState } from 'react';

const Input = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleAddTask() {
    if (!inputValue.trim()) {
      return;
    }
    const taskAlreadyExists = tasks.some(task => task.value === inputValue);

    if (taskAlreadyExists) {
      alert('This task already exists in the list.');
      return;
    }
    const taskId = Date.now();
    const newTask = {
      id: taskId,
      value: inputValue
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
    
  }

  function handleDeleteTask(taskId) {
    const updatedTasks = tasks.filter(task=> task.id !== taskId);
    setTasks(updatedTasks);
  }

  function handleCompleteTask(taskId) {
    const updateTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isComplete: !task.isComplete
        };
      }
      return task;
    })
    setTasks(updateTasks);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTask();
    }
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <form>
        <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Enter task..."></input>
        <button type="button" onClick={handleAddTask}>Add</button>
      </form>
      <ul id="task-list">
        {tasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}><span>{task.value}</span>
          <div className="buttons">
            <button className="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button className="complete" onClick={() => handleCompleteTask(task.id)}>Complete</button>
          </div>
        </li>
        ))}
        
      </ul>
    </div>
  )
}

export default Input
