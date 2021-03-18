import React from 'react';
import "./Product.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const {name,img,seller,price,stock,key} = props.products
    return (
        <div className="product">
            <div className="productImg">
                <img src={img}alt=""/>
            </div>
            <div className="product-description">
                <h3 className="product-name"> <Link to={`/product/${key}`}>{name}</Link> </h3>
            <br/>
                <p><small>by {seller}</small></p>
                <p>$ <strong>{price}</strong></p>
                <p>only {stock} left in stock - order soon</p>
               { props.showAddToCart && <button className="add-cart-btn" onClick= {() =>props.handleAddProduct(props.products)}><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>}
            </div>
        </div>
       
    );
};

export default Product;