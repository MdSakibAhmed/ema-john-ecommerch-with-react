import React, { useState } from "react";
import fakeData from "../../fakeData";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  console.log(fakeData);
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart,setCart] = useState([])
  const handleAddProduct = (product)=>{
    console.log(cart);
      const newCart = [...cart,product];
      setCart(newCart)
      
    
    
}
  return (
    <div className="shop-container">
      <div className="product-container">
        <ul>
          {products.map((pd) => (
            <Product products={pd}
            handleAddProduct ={handleAddProduct}></Product>
          ))}
        </ul>
      </div>
      <div className="cart-container">
       <Cart cartItems={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
