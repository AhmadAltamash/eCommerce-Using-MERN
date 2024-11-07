import React, { useContext } from 'react';
import { BsFillMenuButtonFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './header.css';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

function Header() {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.UserAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;
    const [cart] = state.UserAPI.cart

    const logoutUser = async()=>{
        await axios.get('/user/logout')
        localStorage.clear()
        setIsAdmin(false)
        setIsLogged(false)
    }

    const adminRouter = ()=>{
        return(
            <>            
            <li to='/create_product'><Link>Create Product</Link></li>
            <li to='/category'><Link>Categories</Link></li>
            </>
        )
    }
    const loggedRouter = ()=>{
        return(
            <>            
            <li to='/history'><Link>History</Link></li>
            <li to='/'><Link onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    return (
        <header>
            <div className='menu'>
                <BsFillMenuButtonFill />
            </div>
            <div className='logo'>
                {
                    isAdmin && adminRouter() ? <h1>ADMIN</h1> : <h1>
                    <Link to='/'>Digital Store</Link>
                </h1>
                }
                
            </div>
            <ul>
                {isAdmin && (
                    <li><Link to='/create_product'>Create Product</Link></li>
                )}
                <li><Link to='/product'>Products</Link></li>
                {isLogged ? (
                    <>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
                    </>
                ) : (
                    <li><Link to='/login'>Login or Register</Link></li>
                )}
                <li>
                    <IoCloseSharp className='menu' />
                </li>
            </ul>
                {
                    isAdmin ? '' : <div className='cart-icon'>
                        <span>{cart.length}</span>
                        <Link to='/cart'><FaCartArrowDown className='cart' /></Link>
                    </div>
                }
            
        </header>
    );
}

export default Header;
