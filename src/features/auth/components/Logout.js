import { useEffect } from "react";
import { signOutAsync } from "../AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectUserinfo } from "../../user/userSlice";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserinfo);
  useEffect(() => {
    dispatch(signOutAsync());
  });
  //? but  useEffect runs after render , so we have to delay navigate part
  return <>{!user && <Navigate to="/login" relative={true}></Navigate>}</>;
}

export default Logout;
