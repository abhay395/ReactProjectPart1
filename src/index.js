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
import ProductList from "./features/product-list/components/ProductList.js";
import Home from "./Page/Home.js";
import CartPage from "./Page/CartPage.js";
import CheckoutPage from "./Page/CheckoutPage.js";
import ProductDetail from "./Page/ProductDetailePage.js";
// import SearchitemArea from './Header/SearchitemArea.js'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/checkout" element={<CheckoutPage/>} />
      <Route path="/product-detail/:id" element = {<ProductDetail/>} />
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