import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createSession,
    createAccount,
    endSession,
    getProducts,
    addShoe,
    // getNotification,
    // setNotification,
    pay
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
            localStorage.setItem("cart", JSON.stringify(cart));
            setUser(loggedUser);
            navigate("/")
        }
    };
    const register = async (data) => {
        const res = await createAccount(data);
        console.log(res);
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
        localStorage.removeItem("cart");
        setUser(null);
        setCart([]);
        navigate("/");
    };
    const auth = (val) => {
        if(val===0){
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            setUser(null);
            navigate("/login");
        }
    };

    const products = async () => {
        const res = await getProducts(user['token']);
        console.log(res.data)
        if(res.status===401) auth(0);
        if(res.status===200){
            setProds(res.data);
        }
    };
    const addProd = async (data) => {
        const res = await addShoe(user['token'], data);
        console.log(res);
    };

    const getNotify = async () => {
        //const res = await getNotification(user['user'], user['token']);
    };
    const setNotify = async (val) => {
        //const res = await setNotification(user['user'], user['token'], val);
    };

    const addToCart = (item) => {
        setCart(items => [...items, item]);
        const exists = cart.find((x) => x.id === item.id);
        if(exists) {
            setCart(
                cart.map((x) =>
                    x.id === item.id ? { ...exists, qty: exists.qty + 1} : x
                )
            );
        } else {
            setCart([...cart, { ...item, qty: 1 }])
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
    };
    const removeFromCart = (item) => {
        const exists = cart.find((x) => x.id === item.id);
        if(exists.qty === 1) {
            setCart(cart.filter((x) => x.id !== item.id));
        } else {
            setCart(
                cart.map((x) =>
                    x.id === item.id ? { ...exists, qty: exists.qty - 1} : x
                )
            );
        }
        console.log(cart);
    };
    const clearCart = () => {
        setCart([]);
    };

    const checkout = async (products) => {
        console.log(products);
        const res = await pay(user['token'], products);
        if(res.status===200) {
            setCart([]);
            navigate("/");
        }
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
                                    addToCart,
                                    removeFromCart,
                                    clearCart,
                                    checkout
            }}
        >
            {children}
        </AppContext.Provider>
    );
};