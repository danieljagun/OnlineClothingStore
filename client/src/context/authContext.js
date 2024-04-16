import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const initializeAuthState = () => {
    const getUserFromStorage = () => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    };

    return {
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token'),
        user: getUserFromStorage()
    };
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(initializeAuthState);

    useEffect(() => {
        // Effect to handle state updates based on localStorage changes if needed
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({ token, isAuthenticated: true, user });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ token: null, isAuthenticated: false, user: null });
    };

    return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
