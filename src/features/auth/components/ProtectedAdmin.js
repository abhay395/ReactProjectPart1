import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../AuthSlice";
import { Navigate } from "react-router";

function ProtectedAdmin({children}) {
    const user = useSelector(selectLoggedInUser)
    // console.log(!user)
   if(!user) {
    return <Navigate to='/login'></Navigate>;
}   if(user && user.role!=='admin' ){
    return <Navigate to='/'></Navigate>;
}
   return children;
}

export default ProtectedAdmin;