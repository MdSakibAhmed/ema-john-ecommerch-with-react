import React from 'react';
import "./ReviewItems.css"

const ReviewItems = (props) => {
    const {name,quantity,img} = props.product;
    return (
        <div className="reviewItems">

        <div>

            <h3>{name}</h3>
            <p>quantity:{quantity}</p>
            <button onClick={()=> props.handleRemoveItem(props.product)} className="add-cart-btn">Remove</button>
            </div>
            <div>
                <img src={img} alt=""/>
            </div>
        </div>
    );
};

export default ReviewItems;