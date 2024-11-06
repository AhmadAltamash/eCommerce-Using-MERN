import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    console.log("Token used in request:", token);
                    const res = await axios.get('/user/information', {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    console.log("Response data:", res.data); 

                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    if (error.response) {
                        console.log("Error response data:", error.response.data);
                    } else {
                        console.log("Error message:", error.message);
                    }
                }
            };
            getUser();
        }
    }, [token]);

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin]
    };
}

export default UserAPI;
