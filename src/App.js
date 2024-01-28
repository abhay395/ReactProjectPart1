import React, { useEffect } from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import ProductList from './features/product-list/components/ProductList'
import './App.css';
import Navbar from './features/navbar/Navbar';
import Home from './Page/Home';
import { Outlet } from 'react-router';
import { featchItemsByUserId } from './features/cart/CartApi';
import { featchItemsByUserIdAsync } from './features/cart/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectLoggedInUserToken, selectUserChecked } from './features/auth/AuthSlice';
import { featchLoggedInUserInfoAsync } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch()
  const checkuser = useSelector(selectUserChecked)
  const user = useSelector(selectLoggedInUserToken)
  useEffect(()=>{
  if(user){
    dispatch( featchItemsByUserIdAsync())
    dispatch(featchLoggedInUserInfoAsync());
  }
  },[dispatch,user])
  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[])
  return (
    <div className="App">
   {checkuser && <Outlet/>}
    </div>
  );
}

export default App;
