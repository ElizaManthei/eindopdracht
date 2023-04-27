import {useNavigate} from "react-router-dom";
import React, {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

export default function AuthContextProvider({children}) {
const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState({
            isAuthenticated: false,
            user: null,
            status: 'pending',
        }
    );

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodeToken = jwt_decode(token);
            const id = decodeToken.sub;
            fetchUser(token, id);
        }
    },[]);


    async function fetchUser(token, id, url) {
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            setIsAuth({
                ...isAuth,
                isAuthenticated: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                    status: 'done',
                }
            });
            if (url) {
                navigate('/profile');
            }
        } catch (e) {
            console.error(e);
            setIsAuth({
                isAuthenticated: false,
                user: null,
                status: 'done',
            });

        }


    }


    function inloggen(token) {

        localStorage.setItem('token', token);

        const dec = jwt_decode(token);

        const id = dec.sub;

        console.log(id);

        fetchUser(token, id, true);
        // navigate('/profile');
        console.log(`Gebruiker is ingelogd!`);

    }

    function uitloggen() {
        localStorage.clear();
        setIsAuth({
            isAuthenticated: false,
            user: null,
            status: 'done',
        });
       navigate('/');
        console.log('Gebruiker is uitgelogd!');

    }

    const contextData = {
        ...isAuth,
        loginFunction: inloggen,
        logoutFunction: uitloggen,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}