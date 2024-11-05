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

    useEffect(() => {
        if (params) {
            products.forEach(product => {
                if (product.product_id === params.id) {
                    setDetailProduct(product);
                }
            });
        }
    }, [params, products]);

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
    };

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
                <p>{detailProduct.content}</p>
                <p>Sold: {detailProduct.sold}</p>
                <button onClick={() => addToCart(detailProduct)} className='cart'>Buy Now</button>
            </div>
        </div>
    );
}

export default ProductDetails;
