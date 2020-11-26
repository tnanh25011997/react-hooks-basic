import './App.scss';
import React, { useState } from "react";
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {

  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I Love 1' },
    { id: 2, title: 'I Love 2' },
    { id: 3, title: 'I Love 3' }
  ]);

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);

  }

  function handleToDoFormSubmit(formValues) {
    console.log(formValues);

    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    }

    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>From VN With Love</h1>
      <TodoForm onSubmit={handleToDoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
    </div>
  );
}

export default App;
