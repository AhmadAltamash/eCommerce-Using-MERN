import React, { useEffect, useState } from 'react';
import { BsFillMenuButtonFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartCount(cart.length);
        };

        updateCartCount();

       
        window.addEventListener('storage', updateCartCount);

        return () => {
            window.removeEventListener('storage', updateCartCount);
        };
    }, []);

    return (
        <header>
            <div className='menu'>
                <BsFillMenuButtonFill />
            </div>
            <div className='logo'>
                <h1>
                    <Link to='/'>Digital Store</Link>
                </h1>
            </div>
            <ul>
                <li><Link to='/product'>Products</Link></li>
                <li><Link to='/login'>Login Or Register</Link></li>
                <li>
                    <IoCloseSharp className='menu' />
                </li>
            </ul>

            <div className='cart-icon'>
                <span>{cartCount}</span> {/* Display the cart count */}
                <Link to='/cart'><FaCartArrowDown className='cart' /></Link>
            </div>
        </header>
    );
}

export default Header;
