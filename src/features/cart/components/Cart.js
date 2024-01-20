import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
// import { increment, incrementAsync, selectCount } from "../CartSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectCartItem,
  updateCartAsync,
} from "../CartSlice";
import { updateCart } from "../CartApi";

export default function Cart() {
  // // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const Product = useSelector(selectCartItem);
  const total = Product?.reduce((acu, current) => {
    return acu + current.price * current.quantity;
  }, 0);
  const discount = Product?.reduce((acu, currentva) => {
    return (
      acu +
      Math.round(
        (currentva.price * currentva.quantity) / currentva.discountPercentage
      )
    );
  }, 0);
  // console.log(total, discount);
  const handelQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };
  const deletehandler = (id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  if (Product.length > 0) {
    return (
      <div id="CategoryItems" className={`min-h-screen bg-[#1a202c] pb-10 pt-10`}>
        <h1 className="mb-10 text-center text-[#CCCCCC] text-2xl font-bold">
          Cart Items
        </h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {Product.map((item,index) => (
              <div key={index} className="justify-between lg:max-h-[150px] mb-6 rounded-lg bg-[#2d3748] p-6 shadow-md sm:flex sm:justify-start">
                <img
                  src={item.thumbnail}
                  alt="product-image"
                  className="w-full rounded-lg max-h-[150px] object-fill sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-[#CCCCCC]">
                      {item.title}
                    </h2>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <p className="mr-2 text-[20px]">Qty :</p>
                      <select
                        onChange={(e) => handelQuantity(e, item)}
                        value={item.quantity}
                        className="rounded-lg bg-gray-700 "
                        name=""
                        id=""
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">{item.price}$</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        onClick={() => deletehandler(item.id)}
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <!-- Sub total --> */}
          <div className="mt-6 h-full rounded-lg border pb-6 border-gray-700 text-gray-300 bg-[#2d3748] p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="">Subtotal</p>
              <p className="">{total}$</p>
            </div>
            <div className="flex justify-between">
              <p className="">DileveryCharges</p>
              <p className="">FREE</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="">Discount</p>
              <p className="">{discount}$</p>
            </div>
            <div className="my-4 border border-gray-700"></div>
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold"> {total - discount}$</p>
              </div>
            </div>
            <Link
              to="/checkout"
              className=" block mt-6 w-full text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Check out
            </Link>
            <Link to="/" className="text-blue-500 text-center w-full mt-5">
              Or continue Shoping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return  <div id="CategoryItems" className="max-w-4xl h-screen flex items-center justify-center mx-auto px-10 py-4 ">
  <div className="flex flex-col items-center justify-center py-12">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-24 w-24 text-white mb-4">
      <path
        d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z">
      </path>
    </svg>
    <p className="text-gray-400 text-lg font-semibold mb-4">Your shopping cart is empty.</p>
    <button onClick={()=>navigate('/')}
      className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300">
      Let's go shopping!
    </button>
  </div>
</div>
}
