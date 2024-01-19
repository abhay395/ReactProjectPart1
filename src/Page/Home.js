import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/components/ProductList";
function Home() {
  return (
    <div>
     
     <div className="sticky top-0 z-50" ><Navbar/></div>
      {/* </div> */}

      <ProductList />
    </div>
  );
}

export default Home;
