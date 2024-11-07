import React, { useContext } from 'react';
import './cart.css';
import { GlobalState } from '../../../GlobalState';

function ShoppingCart() {
    const state = useContext(GlobalState);
    const [cart] = state.UserAPI.cart;

    const removeFromCart = (productId) => {
        // Define remove functionality if needed
    };

    if (cart.length === 0) {
        return <p className='empty'>Your cart is empty</p>;
    }

    console.log(cart);
    return (
        <div className='shopping-cart'>
            {cart.map((product) => (
                <div key={product._id} className="cart-item">
                    <img src={product.images?.url || 'path/to/fallback-image.jpg'} alt={product.title} />
                    <div className='detail-box2'>
                        <div className='row'>
                            <h2>{product.title}</h2>
                            <p>₹{product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                        <div className='button'>
                            <button onClick={() => removeFromCart(product.product_id)}>Remove</button>
                            <button onClick={() => removeFromCart(product.product_id)}>Buy This Now</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ShoppingCart;
