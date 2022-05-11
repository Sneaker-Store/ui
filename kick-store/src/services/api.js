import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:"
});

export const createSession = async (email, password) => {
    return api.post('5000/login', {email, password});
}

export const endSession = async (user) => {
    const headers = {'token': user.token, 'email': user.email};
    return api.get('5000/logout', {headers});
}

export const createAccount = async (username, email, password) => {
    return api.post('5000/register', {username, email, password});
}

export const getProducts = async (user) => {
    const headers = {'token': user.token, 'email': user.email};
    return api.get('8080/v1/products', {headers});
} 