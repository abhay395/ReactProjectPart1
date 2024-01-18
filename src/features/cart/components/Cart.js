import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
// import { increment, incrementAsync, selectCount } from "../CartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  // // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const Cartid = [ [{
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
      "https://cdn.dummyjson.com/product-images/1/2.jpg",
      "https://cdn.dummyjson.com/product-images/1/3.jpg",
      "https://cdn.dummyjson.com/product-images/1/4.jpg",
      "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
    ]
  },{quantityid:4}]]
  return (
    <div  id="CategoryItems" class={`min-h-screen bg-[#1a202c] pb-10 pt-10`}>
    <h1 class="mb-10 text-center text-[#CCCCCC] text-2xl font-bold">Cart Items</h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div class="rounded-lg md:w-2/3">
      {Cartid.map((item)=>( 
         <div class="justify-between lg:max-h-[150px] mb-6 rounded-lg bg-[#2d3748] p-6 shadow-md sm:flex sm:justify-start">
          <img src={item[0].thumbnail} alt="product-image" class="w-full rounded-lg max-h-[150px] object-fill sm:w-40" />
          <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
              <h2 class="text-lg font-bold text-[#CCCCCC]">{item[0].title}</h2> 
            </div>
            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div class="flex items-center border-gray-100">
                <p className="mr-2 text-[20px]" >Qty :</p>
             <select className="rounded-lg bg-gray-700 " name="" id="">
              <option value="">1</option>
              <option value="">2</option>
             </select>
              </div>
              <div class="flex items-center space-x-4">
                <p class="text-sm">{item[0].price}$</p>
                <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>))}
      
      </div>
      {/* <!-- Sub total --> */}
      <div class="mt-6 h-full rounded-lg border pb-6 border-gray-700 text-gray-300 bg-[#2d3748] p-6 shadow-md md:mt-0 md:w-1/3">
        <div class="mb-2 flex justify-between">
          <p class="">Subtotal</p>
          <p class="">45$</p>
        </div>
        <div class="flex justify-between">
          <p class="">DileveryCharges</p>
          <p class="">FREE</p>
        </div>
        <div class="flex justify-between mt-2">
          <p class="">Discount</p>
          <p class="">45$</p>
        </div>
        <div class="my-4 border border-gray-700" ></div>
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            
            <p class="mb-1 text-lg font-bold"> 78$</p>
          </div>
        </div>
        <Link to='/checkout' class=" block mt-6 w-full text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
        <Link to='/' className="text-blue-500 text-center w-full mt-5" >Or continue Shoping</Link>
      </div>
    </div>
  </div>
  );
}
