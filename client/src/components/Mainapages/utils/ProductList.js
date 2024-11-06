import React from 'react';
import { Link } from 'react-router-dom';
import './productlist.css';

function ProductList({ product }) {
    // Function to add product to cart
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
    };

    return (
        <div className='product_card'>
            <img src={product.images?.url || 'path/to/fallback-image.jpg'} alt={product.title} />
            <div className='product-box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>₹{product.price}</span>
                <p>{product.description}</p>
            </div>
            <div className='row-btn'>
                <button id='btn-buy' className='link' onClick={() => addToCart(product)}>Add to Cart</button>
                <Link id='btn-view' to={`/product/details/${product.product_id}`}>View Details</Link>
            </div>
        </div>
    );
}

export default ProductList;
