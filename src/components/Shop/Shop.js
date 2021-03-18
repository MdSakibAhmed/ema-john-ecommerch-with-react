import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from 'react-router-dom';

const Shop = () => {
  console.log(fakeData);
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart,setCart] = useState([])


useEffect(()=> {
  const savedCart = getDatabaseCart();
  const productKeys = Object.keys(savedCart);
  const cartProducts = productKeys.map(key => {
    const product = fakeData.find(product => product.key === key);
    product.quantity = savedCart[key]
    return product
  })
  setCart(cartProducts)

},[])

  const handleAddProduct = (product)=>{
    const toBeAddedKey = product.key;
    const sameProducts = cart.find(pd => pd.key === toBeAddedKey);
    let count = 1;
    let newCart = [];
    if(sameProducts){
      count = product.quantity + 1;
      product.quantity = count;
      const others = cart.filter(pd => pd.key !== toBeAddedKey);
      newCart = [...others, sameProducts];
      // newCart.push(sameProducts) 
    }
    else{
      product.quantity = count;
      newCart = [...cart,product]
    }
    
      
      setCart(newCart)
      
     
      
      addToDatabaseCart(product.key,count)
      
    
    
}
  return (
    <div className="container">
      <div className="product-container">
        <ul>
          {products.map((pd) => (
            <Product key={pd.key} products={pd}
            handleAddProduct ={handleAddProduct}   showAddToCart={true}></Product>
          ))}
        </ul> 
      </div>
      <div className="cart-container">
       <Cart cartItems={cart}>
      
       <Link to="/review"> <button className="add-cart-btn">review your order</button></Link>
       </Cart>
      </div>
    </div>
  );
};

export default Shop;
