import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user || !user.isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AdminRoute;
