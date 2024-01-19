import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../AuthSlice";
import { Navigate } from "react-router";

function Protected({children}) {
    const user = useSelector(selectLoggedInUser)
    // console.log(!user)
   if(!user) {
    return <Navigate to='/login'></Navigate>;
}
   return children;
}

export default Protected;