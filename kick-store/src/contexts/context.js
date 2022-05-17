import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createSession,
    createAccount,
    endSession,
    getProducts,
    addShoe
} from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
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
        console.log(res.data['token']);
        if(res.status===200) {
            const loggedUser = res.data;
            localStorage.setItem("user", JSON.stringify(loggedUser));
            setUser(loggedUser);
            navigate("/")
        }
    };
    const register = async (username, email, password) => {
        const res = await createAccount(username, email, password);
        if(res.status===401) auth(0);
        if(res.status===201){
            navigate("/login");
        }
    };
    const logout = async () => {
        const res = await endSession(user['token']);
        if(res.status===401) auth(0);
        if(res.status === 200) {
            console.log("Logout");
        }else{
            console.log("error");
        }
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };
    const auth = (val) => {
        if(val===0){
            localStorage.removeItem("user");
            setUser(null);
            navigate("/login");
        }
    };

    const products = async () => {
        const res = await getProducts(user['token']);
        if(res.status===401) auth(0);
        if(res.status===200){
            setProds(res.data);
        }
    };

    const addProd = async () => {
        const res = await addShoe(user['token']);
    };

    const getNotify = async () => {

    };

    const setNotify = async () => {

    };

    const addToCart = (item) => {
        setCart(items => [...items, item]);
    };

    return(
        <AppContext.Provider 
            value={{authenticated: !!user,
                                    user,
                                    loading,
                                    prods,
                                    cart,
                                    login,
                                    register,
                                    logout,
                                    auth,
                                    products,
                                    addProd,
                                    getNotify,
                                    setNotify,
                                    addToCart
            }}
        >
            {children}
        </AppContext.Provider>
    );
};