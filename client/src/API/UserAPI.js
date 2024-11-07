import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GlobalState } from '../GlobalState';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    const addCart = async (product) => {
        if (!isLogged) return alert("Please log in first.");

        const check = cart.every((item) => item._id !== product._id);

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }]);
        } else {
            alert("This product is already in the cart.");
        }
    };

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/information', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setIsLogged(true);
                    setIsAdmin(res.data.role === 1);
                } catch (err) {
                    console.error(err);
                }
            };
            getUser();
        }
    }, [token]);

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart,
    };
}

export default UserAPI;
