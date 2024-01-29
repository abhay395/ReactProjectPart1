import React, { useEffect } from 'react';
import {MoonLoader} from 'react-spinners'
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
import { checkAuthAsync, selectAuthStatus, selectLoggedInUserToken, selectUserChecked } from './features/auth/AuthSlice';
import { featchLoggedInUserInfoAsync } from './features/user/userSlice';
import { featchBrandAsync, featchCategoriesAsync } from './features/product-list/ProductSlice';

function App() {
  const dispatch = useDispatch()
  const checkuser = useSelector(selectUserChecked)
  const user = useSelector(selectLoggedInUserToken)
  // // const status = useSelector(selectAuthStatus)
  useEffect(()=>{
  if(user){
    dispatch( featchItemsByUserIdAsync())
    dispatch(featchLoggedInUserInfoAsync());
  }
  },[dispatch,user])
  useEffect(() => {
    dispatch(featchBrandAsync({}));
    dispatch(featchCategoriesAsync({}));
  }, []);
  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[])
  return (
    <div className="App">
   { checkuser && <Outlet/>}
    </div>
  );
}

export default App;
