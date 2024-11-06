import React, { useContext } from 'react';
import { BsFillMenuButtonFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './header.css';
import { GlobalState } from '../../GlobalState';

function Header() {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.UserAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;

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
                {isAdmin && (
                    <li><Link to='/admin'>Admin Dashboard</Link></li>
                )}
                <li><Link to='/product'>Products</Link></li>
                {isLogged ? (
                    <>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/logout'>Logout</Link></li>
                    </>
                ) : (
                    <li><Link to='/login'>Login or Register</Link></li>
                )}
                <li>
                    <IoCloseSharp className='menu' />
                </li>
            </ul>

            <div className='cart-icon'>
                <span>0</span>
                <Link to='/cart'><FaCartArrowDown className='cart' /></Link>
            </div>
        </header>
    );
}

export default Header;
