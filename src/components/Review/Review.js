import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItems from "../ReviewItems/ReviewItems";
import logo from "../../images/giphy.gif";
import { useHistory } from "react-router";

const Review = () => {
  const [happyImg, setHappyImg] = useState(false);
  const [cart, setCart] = useState([]);
  const history = useHistory()
  const handleProceedCheckout = () => {
    // setCart([]);
    // processOrder();
    // setHappyImg(true);

    history.push("/shipment")
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    console.log(savedCart);
    const productKeys = Object.keys(savedCart);

    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((product) => product.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    console.log(cartProducts);
    setCart(cartProducts);
  }, []);

  const handleRemoveItem = (product) => {
    removeFromDatabaseCart(product.key);
    const removeItem = cart.filter((pd) => pd.key !== product.key);
    console.log(removeItem);

    setCart(removeItem);
  };
  let thankYou;
  if (happyImg) {
    thankYou = <img src={logo} alt="" />;
  }
  return (
    <div className="container">
      {/* <h1>This is review page {cart.length}</h1> */}
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItems
            key={pd.key}
            handleRemoveItem={handleRemoveItem}
            product={pd}
          ></ReviewItems>
        ))}
        {thankYou}
      </div>

      <div className="cart-container">
        <Cart cartItems={cart}>
          <button onClick={handleProceedCheckout} className="add-cart-btn">
            proceed to checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
