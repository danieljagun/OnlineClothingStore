import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.interceptors.request.use(function (config) {

    const noAuthNeeded = [
        { method: 'GET', path: '/items' },
        { method: 'POST', path: '/orders' }
    ];

    const isNoAuthNeeded = noAuthNeeded.some(rule =>
        config.url.includes(rule.path) && config.method.toLowerCase() === rule.method.toLowerCase()
    );

    if (isNoAuthNeeded) {
        console.log("Authorization header removed for specific request:", config.url);
        delete config.headers.Authorization;
    }

    return config;
}, function (error) {

    return Promise.reject(error);
});

// Items
export const fetchItems = (token) => {
    return axios.get(`${API_URL}/items`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
export const fetchItemById = (id) => axios.get(`${API_URL}/items/${id}`);
export const createItem = (itemData, token) => {
    return axios.post(`${API_URL}/items`, itemData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
export const updateItem = (id, itemData, token) => axios.put(`${API_URL}/items/${id}`, itemData, {
    headers: { Authorization: `Bearer ${token}` }
});
export const deleteItem = (id, token) => axios.delete(`${API_URL}/items/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
});

// Orders
export const fetchOrders = (token) => {
    return axios.get(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
export const createOrder = (orderData) => {
    return axios.post(`${API_URL}/orders`, orderData)
        .catch(error => {
            console.error("Error creating order:", error.response);
            throw error;
        });
};

// Reviews
export const fetchReviewsForItem = (itemId) => axios.get(`${API_URL}/reviews/item/${itemId}`);
export const postReview = (reviewData, token) => axios.post(`${API_URL}/reviews`, reviewData, {
    headers: { Authorization: `Bearer ${token}` }
});

// Users
export const registerUser = (userData) => axios.post(`${API_URL}/users/register`, userData);
export const loginUser = (loginData) => axios.post(`${API_URL}/users/login`, loginData);
