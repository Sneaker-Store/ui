import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    api,
    createSession,
    createAccount,
    endSession,
    getProducts
} from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [prods, setProds] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUSer = localStorage.getItem("user");
        if(recoveredUSer){
            setUser(JSON.parse(recoveredUSer));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await createSession(email, password);
        const loggedUser = {email: res.data['email'], token: res.data['token']};
        localStorage.setItem("user", JSON.stringify(loggedUser));
        setUser(loggedUser);
        navigate("/")
    };
    const register = async (username, email, password) => {
        const res = await createAccount(username, email, password);
        if(res.status===201){
            navigate("/login");
        }
    };
    const logout = async () => {
        //const cUser = JSON.parse(localStorage.getItem('user'));
        const res = await endSession(user);
        if(res.status===200){
            //api.defaults.headers.Authorization = null;
            localStorage.removeItem("user");
            setUser(null);
            navigate("/");
        }
    };
    const auth = (val) => {
        if(val===0){
            //api.defaults.headers.Authorization = null;
            localStorage.removeItem("user");
            setUser(null);
            navigate("/login");
        }
    };

    const products = async () => {
        const res = await getProducts(user);
        if(res===200){
            setProds(JSON.parse(res.data));
        }
    };

    return(
        <AppContext.Provider value={{authenticated: !!user, user, loading, prods, login, register, logout, auth, products}}>
            {children}
        </AppContext.Provider>
    );
};