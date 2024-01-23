import AdminProductList from "../features/admin/components/AdminProductList";
import Navbar from "../features/navbar/Navbar";

function AdminHomepage() {
    return ( <div>
        <Navbar/>
        <AdminProductList/>
    </div> );
}

export default AdminHomepage;