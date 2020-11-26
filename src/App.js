import './App.scss';
import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import PostFilterForm from './components/PostFilterForm';

function App() {

  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I Love 1' },
    { id: 2, title: 'I Love 2' },
    { id: 3, title: 'I Love 3' }
  ]);

  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: '',
  });

  useEffect(() => {
    async function fetchPostList() {

      try {
        // _limit=10&_page=1
        const paramString = queryString.stringify(filters);

        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Fail to fetch post list: ', error.message);
      }
    }

    fetchPostList();

  }, [filters]);




  function handlePageChange(newPage) {
    console.log(newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

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


  function handleFilterChange(newFilters) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }

  return (
    <div className="app">
      <h1>From VN With Love</h1>
      {/* <TodoForm onSubmit={handleToDoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}

      <PostFilterForm onSubmit={handleFilterChange} />
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
