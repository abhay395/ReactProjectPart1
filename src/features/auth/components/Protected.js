import { useSelector } from "react-redux";
import {  selectLoggedInUserToken } from "../AuthSlice";
import { Navigate } from "react-router";

function Protected({children}) {
    const user = useSelector(selectLoggedInUserToken)
    // console.log(!user)
   if(!user) {
    return <Navigate to='/login'></Navigate>;
}
   return children;
}

export default Protected;