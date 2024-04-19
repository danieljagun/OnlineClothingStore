import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const getInitialUser = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error('Failed to parse user data:', error);
                return null;
            }
        }
        return null;
    };

    const getInitialToken = () => localStorage.getItem('token');

    const [authState, setAuthState] = useState({
        token: getInitialToken(),
        user: getInitialUser(),
        isAuthenticated: Boolean(getInitialToken()),
    });

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'token' || event.key === 'user') {
                const newToken = getInitialToken();
                const newUser = getInitialUser();
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
        console.log("Token set in localStorage:", token);
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
