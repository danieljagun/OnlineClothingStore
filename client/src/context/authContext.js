import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
        isAuthenticated: Boolean(localStorage.getItem('token')),
    });

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'token') {
                const newToken = localStorage.getItem('token');
                const newUser = JSON.parse(localStorage.getItem('user'));
                setAuthState({ token: newToken, user: newUser, isAuthenticated: !!newToken });
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({
            token,
            isAuthenticated: true,
            user
        });
        console.log("Login updated state:", { token, user });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ token: null, user: null, isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
