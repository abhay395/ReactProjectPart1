import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
// import { increment, incrementAsync, selectCount } from "../CartSlice";
import { Link, useNavigate } from "react-router-dom";
// import { featchLoggedInUserInfoAsync, selectUserinfo } from "../useSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
// import { updateCart } from "./userApi";

export default function Myprofile() {
  // // const count = useSelector(selectCount);
  const user  = useSelector(selectLoggedInUser)
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(user)
    // dispatch(featchLoggedInUserInfoAsync(user?.id))
  },[dispatch])
 
  // const UserInfo = useSelector(selectUserinfo);
  // console.log(UserInfo)
  return <div>Hello</div>
  
}
