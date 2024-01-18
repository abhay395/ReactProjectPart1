import React from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import ProductList from './features/product-list/components/ProductList'
import './App.css';
import Navbar from './features/navbar/Navbar';
import Home from './Page/Home';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="App">
     <Outlet/>
    </div>
  );
}

export default App;
