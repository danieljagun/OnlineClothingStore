import { useCallback } from 'react';
import { useAuth } from '../context/authContext';
import {
    fetchItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
    fetchOrders,
    createOrder,
    fetchReviewsForItem,
    postReview,
    registerUser,
    loginUser
} from '../services/ApiService';

export function useApi() {
    const { token } = useAuth(); // Get the token using useAuth

    return {
        fetchItems: useCallback(() => fetchItems({ token }), [token]),
        fetchItemById: useCallback((id) => fetchItemById(id, { token }), [token]),
        createItem: useCallback((itemData) => createItem(itemData, { token }), [token]),
        updateItem: useCallback((id, itemData) => updateItem(id, itemData, { token }), [token]),
        deleteItem: useCallback((id) => deleteItem(id, { token }), [token]),
        fetchOrders: useCallback(() => fetchOrders({ token }), [token]),
        createOrder: useCallback((orderData) => createOrder(orderData, { token }), [token]),
        fetchReviewsForItem: useCallback((itemId) => fetchReviewsForItem(itemId, { token }), [token]),
        postReview: useCallback((reviewData) => postReview(reviewData, { token }), [token]),
        registerUser: useCallback((userData) => registerUser(userData), []),
        loginUser: useCallback((loginData) => loginUser(loginData), [])
    };
}
