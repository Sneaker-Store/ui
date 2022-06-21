import axios from "axios";


export const auth = axios.create({
    baseURL: "http://localhost:5000"  //process.env.REACT_APP_AUTH_BASE_URL
});
export const products = axios.create({
    baseURL: "http://localhost:8080/v1" //process.env.REACT_APP_PROD_BASE_URL
});
export const notify = axios.create({
    baseURL: "http://notify.k3s" //process.env.REACT_APP_NOT_BASE_URL
    //baseURL: "http://localhost:9000/v1"
});
export const payment = axios.create({
    baseURL: "http://localhost:2700" //process.env.REACT_APP_PAY_BASE_URL
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

export const createAccount = async (data) => {
    const res = auth.post('register', {data}).catch((e) => {
        return e.response;
    });
    notify.post('register', data).catch((e) => {
        return e.response;
    });
    return res;
}

export const getProducts = async (token) => {
    const headers = {'token': token.token, 'email': token.email};
    const res = products.get('products', {headers}).catch((e) => {
        return e.response;
    });
    return res;
}

export const addShoe = async (token, data) => {
    const headers = {'token': token.token, 'email': token.email};
    const res = products.post('products', data, headers).catch((e) => {
        return e.response;
    });
    return res;
}

export const getNotification = async (user, token) => {
    const headers = {'token': token.token, 'email': token.email};
    const res = notify.get('user/'+user.username+'/service', headers).catch((e) => {
        return e.response;
    });
    return res;
}

// export const setNotification = async (user, token, val) => {
//     const headers = {'token': token.token, 'email': token.email};
//     const res = notify.put('user/', {headers}, {params: { 'username': user.username}}, val).catch((e) => {
//         return e.response;
//     });
//     return res;
// }

export const pay = async (token, products) => {
    const res = payment.post('payments', {'username': token.email, 'ammount': products['ammount']}).catch((e) => {
        return e.response;
    });
    return res;
}