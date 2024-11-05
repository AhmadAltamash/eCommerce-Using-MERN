import React, { useState, useEffect } from 'react';
import './cart.css'
import {Link} from 'react-router-dom'

function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.product_id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); 
        alert('Product removed from cart');
    };

    return (
        <div className='shopping-cart'>
            <h2>Your Cart</h2>
            {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.images.url} alt={item.title} />
                        <div>
                            <h4>{item.title}</h4>
                            <p>₹{item.price}</p>
                            <p>Quantity: 1</p>
                            <button onClick={() => removeFromCart(item.product_id)}>Remove</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            {cartItems.length > 0 && (
                <Link to='/checkout'>
                    <button className='btn' >Proceed to Checkout</button>
                </Link>
            )}
        </div>
    );
}

export default ShoppingCart;
