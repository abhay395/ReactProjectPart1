import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./App.css";
import "./index.css";


import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
// import Login from "./Header/Login.js";
import { store } from "../src/app/store.js";
import LoginPage from "./Page/LoginPage.js";
import SignupPage from "./Page/SignupPage.js";
// import ProductList from "./features/product-list/components/ProductList.js";
import Home from "./Page/Home.js";
import CartPage from "./Page/CartPage.js";
import CheckoutPage from "./Page/CheckoutPage.js";
import ProductDetail from "./Page/ProductDetailePage.js";
import Protected from "./features/auth/components/Protected.js";
import PageNotFound from "./Page/404Page.js";
import OrderSucces from "./Page/OrderSucesspage.js";
import MyProfilepage from "./Page/MyProfilepage.js";
import MyOrderPage from "./Page/MyOrderPage.js";
// import SearchitemArea from './Header/SearchitemArea.js'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Protected><Home/></Protected>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/cart" element={<Protected><CartPage/></Protected>} />
      <Route path="/checkout" element={<Protected><CheckoutPage/></Protected>} />
      <Route path="/product-detail/:id" element = {<Protected><ProductDetail/></Protected>} />
      <Route path="*" element = {<PageNotFound/>} />
      <Route path="/orderSucces/:id" element = {<OrderSucces/>} />
      <Route path="/myprofile" element = {<MyProfilepage/>} />
      <Route path="/myorders" element = {<MyOrderPage/>} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
// </React.StrictMode>
);