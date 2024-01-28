import { useSelector } from "react-redux";
// // import { selectLoggedInUserToken } from "../AuthSlice";
import { Navigate } from "react-router";
import { selectUserinfo } from "../../user/userSlice";

function ProtectedAdmin({children}) {
    const user = useSelector(selectUserinfo)
    // console.log(!user)
   if(!user) {
    return <Navigate to='/login'></Navigate>;
}   if(user && user.role!=='admin' ){
    return <Navigate to='/'></Navigate>;
}
   return children;
}

export default ProtectedAdmin;