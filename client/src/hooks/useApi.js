import { useCallback } from 'react';
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
    return {
        fetchItems: useCallback((params) => fetchItems(params), []),
        fetchItemById: useCallback((id) => fetchItemById(id), []),
        createItem: useCallback((itemData, token) => createItem(itemData, token), []),
        updateItem: useCallback((id, itemData, token) => updateItem(id, itemData, token), []),
        deleteItem: useCallback((id, token) => deleteItem(id, token), []),
        fetchOrders: useCallback((token) => fetchOrders(token), []),
        createOrder: useCallback((orderData) => createOrder(orderData), []),
        fetchReviewsForItem: useCallback((itemId) => fetchReviewsForItem(itemId), []),
        postReview: useCallback((reviewData, token) => postReview(reviewData, token), []),
        registerUser: useCallback((userData) => registerUser(userData), []),
        loginUser: useCallback((loginData) => loginUser(loginData), [])
    };
}
