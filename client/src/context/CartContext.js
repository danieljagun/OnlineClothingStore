import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {...state, items: [...state.items, action.payload]};
        case 'REMOVE_ITEM':
            return {...state, items: state.items.filter(item => item.id !== action.payload.id)};
        case 'CLEAR_CART':
            return { items: [] };
        default:
            return state;
    }
};

const initializeCart = () => {
    // Here, you could also initialize the cart from local storage or other persistent storage if required
    return { items: [] };
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initializeCart());

    const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
    const removeItem = (itemId) => dispatch({ type: 'REMOVE_ITEM', payload: { id: itemId } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    return (
        <CartContext.Provider value={{ cart: state, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
