import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const getUserFromStorage = () => {
        const userString = localStorage.getItem('user');
        if (userString) {
            try {
                return JSON.parse(userString);
            } catch (e) {
                console.error("Parsing error on user from localStorage", e);
                return null; // Default to null if parsing fails
            }
        }
        return null;
    };

    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        user: getUserFromStorage()
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = getUserFromStorage();

        if (token && user) {
            setAuthState(prev => ({
                ...prev,
                isAuthenticated: true,
                user
            }));
        }
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({
            token,
            isAuthenticated: true,
            user
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
            token: null,
            isAuthenticated: false,
            user: null
        });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
