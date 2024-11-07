import { createContext, useEffect, useState } from "react";
import ProductAPI from "./API/ProductAPI";
import axios from 'axios';
import UserAPI from "./API/UserAPI";


export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const productAPI = ProductAPI();
    const userAPI = UserAPI(token);

    const refreshToken = async () => {
        try {
            const response = await axios.post('/user/refresh_token');
            setToken(response.data.accessToken);
        } catch (error) {
            console.error('Error refreshing tokens:', error);
        }
    };

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            refreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        ProductAPI: productAPI,
        UserAPI: userAPI,
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
