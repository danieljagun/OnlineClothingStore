import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import { useAuth } from '../context/authContext';

const AdminRoute = ({ children, ...rest }) => {
    const { isAuthenticated, user } = useAuth(); // Get user info from context

    return (
        <Route
            {...rest}
            element={
                isAuthenticated && user.isAdmin ? (
                    children
                ) : (
                    <Navigate to="/login" replace /> // Use Navigate for redirection
                )
            }
        />
    );
};

export default AdminRoute;
