import React, { useState, useContext  } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState'
import './productlist.css';

function ProductList({ product }) {

    const [productState, setProductState] = useState(product);
    const state = useContext(GlobalState)
    const [products] = state.ProductAPI.products
    const [isAdmin] = state.UserAPI.isAdmin
    const addCart = state.UserAPI.addCart

    const handleCheckboxChange = () => {

        setProductState({ ...productState, checked: !productState.checked }); 
    };
    

    return (
        <div className='product_card'>
            {
                isAdmin && (
                    <input 
                        type='checkbox' 
                        checked={productState.checked} 
                        onChange={handleCheckboxChange} 
                    />
                )
            }
            <img src={product.images?.url || 'path/to/fallback-image.jpg'} alt={product.title} />
            <div className='product-box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>₹{product.price}</span>
                <p>{product.description}</p>
            </div>
            <div className='row-btn'>
                {
                    isAdmin ? 
                    <>
                        <button id='btn-buy' className='link' >Delete</button>
                        <Link id='btn-view' to={`/product/details/${product.product_id}`}>Edit</Link>
                    </>
                    : 
                    <>
                        <button id='btn-buy' className='link' onClick={() => addCart(product)}>Add to Cart</button>
                        <Link id='btn-view' to={`/product/details/${product.product_id}`}>View Details</Link>
                    </>
                }
            </div>
        </div>
    );
}

export default ProductList;
