import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productkey} = useParams();
    console.log(productkey);
    console.log(fakeData);
   const product = fakeData.find(pd => pd.key === productkey);
   console.log(product);
    return (
        <div>
            <h1>This is a product detailed page</h1>
            <Product showAddToCart={false} products={product}></Product> 
        </div>
    );
};

export default ProductDetail;