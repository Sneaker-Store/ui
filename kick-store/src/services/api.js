import axios from "axios";

export const auth = axios.create({
    baseURL: "http://localhost:5000"
});
export const products = axios.create({
    baseURL: "http://localhost:8080/v1"
});
export const notify = axios.create({
    baseURL: "http://localhost:9000/v1"
});

auth.interceptors.response.use((response) => {
    return response;
});
products.interceptors.response.use((response) => {
    return response;
});

export const createSession = async (email, password) => {
    return auth.post('login', {email, password});
}

export const endSession = async (user) => {
    const headers = {'token': user.token, 'email': user.email};
    return auth.get('logout', {headers});
}

export const createAccount = async (username, email, password) => {
    return auth.post('register', {username, email, password});
}

export const getProducts = async (token) => {
    const headers = {'token': token.token, 'email': token.email};
    const res = products.get('products', {headers}).catch((e) => {
        return e.response;
    });
    return res;
}

export const addShoe = async (token, shoe) => {
    const headers = {'token': token.token, 'email': token.email};
    const res = products.get('add', {headers}, shoe).catch((e) => {
        return e.response;
    });
    return res;
}