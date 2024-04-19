import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

axios.interceptors.request.use(function (config) {
    // Paths that do not require the Authorization header
    const noAuthNeeded = [
        { method: 'GET', path: '/items' },
    ];

    // Check if the current request should have no Authorization header
    const isNoAuthNeeded = noAuthNeeded.some(rule =>
        config.url.endsWith(rule.path) && config.method.toLowerCase() === rule.method.toLowerCase()
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
export const fetchItems = (searchParams = {}) => {
    const queryString = new URLSearchParams(searchParams).toString();
    return axios.get(`${API_URL}/items?${queryString}`);
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

export const createOrder = (orderData, token) => {
    return axios.post(`${API_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
    }).catch(error => {
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
