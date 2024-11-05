import React from 'react';
import Product from './product/Products';
import Cart from './cart/ShoppingCart';
import Login from './login/Login';
import Register from './login/Register';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './utils/ProductDetails';
import Home from '../Homepage/Home';
import Checkout from './payment/Checkout';

function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/details/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    );
}

export default Pages;
