import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {...state, items: [...state.items, {...action.payload, quantity: 1}]};
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload),
            };
        case 'CLEAR_CART':
            return { items: [] };
        default:
            return state;
    }
};

const initializeCart = () => {
    return { items: [] };
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initializeCart());

    const addItem = (item) => {
        // Check if the item is already in the cart
        const itemExists = state.items.find((i) => i._id === item._id);
        if (itemExists) {
            dispatch({
                type: 'INCREASE_QUANTITY',
                payload: item._id
            });
        } else {
            // If it does not exist, add the item with quantity 1
            dispatch({
                type: 'ADD_ITEM',
                payload: { ...item, quantity: 1 }
            });
        }
    };
    const removeItem = (itemId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    };
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    return (
        <CartContext.Provider value={{ cart: state, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
