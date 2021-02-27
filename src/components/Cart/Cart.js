import React from 'react';

const Cart = (props) => {
    const cart = props.cartItems;

//    const total = cart.reduce((product,total) => total + product.price,0);
//    console.log(total);
   let total = 0;
   for (let i = 0; i < cart.length; i++) {
       const element = cart[i];
       total = total + element.price;
       
   }
   console.log(total);

const formatNumber = (num) =>{
    const format = num.toFixed(2);
    return Number(format);

}

    let shipping = 0;
    if(total > 50){
        shipping = 0;
    }
    else if(total > 30){
        shipping = 10;
        
    }
    else if(total > 0){
        shipping = 30;
    }
    const tax = formatNumber( total * 0.15);
    const grandTotal = formatNumber( total + shipping + tax);
  
    return (
        <div className="cart-details">
        <h2 style={{textAlign:"center"}}>Order summary</h2>
        <h3 style={{textAlign:"center"}}>Items Ordered {props.cartItems.length}</h3>
        <p>Shipping and handing: ${shipping}</p>
        <p>Total before text: ${ formatNumber( total + shipping)}</p>
        <p>Estimated tax: ${tax}</p>
        <p>Order Total: ${grandTotal}</p>
        


            
        </div>
    );
};

export default Cart;