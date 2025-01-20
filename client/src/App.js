import React from 'react';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList/TodoList';
import { TodoProvider } from "../src/components/ContextTodo/TodoContext";



function App() {
  return (
    <div>
      <TodoProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
           <Route path="/" element={<TodoList />} />
          </Routes>
        </Router>

      </TodoProvider>

    </div>
  );
}

export default App;
