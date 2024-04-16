import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Items
export const fetchItems = (params) => axios.get(`${API_URL}/items`, { params });
export const fetchItemById = (id) => axios.get(`${API_URL}/items/${id}`);
export const createItem = (itemData, token) => axios.post(`${API_URL}/items`, itemData, {
    headers: { Authorization: `Bearer ${token}` }
});
export const updateItem = (id, itemData, token) => axios.put(`${API_URL}/items/${id}`, itemData, {
    headers: { Authorization: `Bearer ${token}` }
});
export const deleteItem = (id, token) => axios.delete(`${API_URL}/items/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
});

// Orders
export const fetchOrders = (token) => axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` }
});
export const createOrder = (orderData, token) => axios.post(`${API_URL}/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` }
});

// Reviews
export const fetchReviewsForItem = (itemId) => axios.get(`${API_URL}/reviews/item/${itemId}`);
export const postReview = (reviewData, token) => axios.post(`${API_URL}/reviews`, reviewData, {
    headers: { Authorization: `Bearer ${token}` }
});

// Users
export const registerUser = (userData) => axios.post(`${API_URL}/users/register`, userData);
export const loginUser = (loginData) => axios.post(`${API_URL}/users/login`, loginData);
