import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Register';
import ClassList from './components/ClassList';
import Create from "./components/CreateClass";
import Book from './components/BookClass';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/getClass" element={<ClassList />} />
        <Route path="/createclass" element={<Create />} />
        <Route path="/bookclass" element={<Book />} />
      </Routes>
    </Router>
  );
};

export default App;
