import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails() {
    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.ProductAPI.products;
    const [detailProduct, setDetailProduct] = useState([]);
    const addCart = state.UserAPI.addCart

    useEffect(() => {
        if (params) {
            products.forEach(product => {
                if (product.product_id === params.id) {
                    setDetailProduct(product);
                }
            });
        }
    }, [params, products]);


    return (
        <div className='detail'>
            <img src={detailProduct.images?.url || 'path/to/fallback-image.jpg'} alt={detailProduct.title} />
            <div className="detail-box">
                <div className='row'>
                    <h2>{detailProduct.title}</h2>
                    <h6>{detailProduct.product_id}</h6>
                </div>
                <span>₹{detailProduct.price}</span>
                <p>{detailProduct.description}</p>
                <p>{detailProduct.contents}</p>
                <p>Sold: {detailProduct.sold}</p>
                <button onClick={() => addCart(detailProduct)} className='cart'>Buy Now</button>
            </div>
        </div>
    );
}

export default ProductDetails;
