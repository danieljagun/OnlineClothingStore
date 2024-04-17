import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {AuthProvider, useAuth} from './context/authContext';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminPanel from './components/AdminPanel';
import UserOrders from './components/UserOrders';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import AddItem from './components/AddItem';
import ItemsList from './components/ItemsList';
import SearchItems from './components/SearchItems';
import ShoppingCart from './components/ShoppingCart';
import ItemDetail from './components/ItemDetail';
import Confirmation from "./components/Confirmation";
import Checkout from "./components/Checkout";
import './App.css';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <div className="App">
                        <NavBar />
                        <Header />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/items-list" element={<ItemsList />} />
                            <Route path="/search-items" element={<SearchItems />} />
                            <Route path="/shopping-cart" element={<ShoppingCart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/confirmation" element={<Confirmation />} />
                            <Route path="/items/:itemId" element={<ItemDetail />} />
                            <Route path="/add-item" element={<AdminRoute><AddItem /></AdminRoute>} />
                            <Route path="/dashboard" element={<ProtectedRoute><DashboardOrAdminDashboard /></ProtectedRoute>} />
                            <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
                            <Route path="/user-orders" element={<ProtectedRoute><UserOrdersComponent /></ProtectedRoute>} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

function HomePage() {
    return <ItemsList />;
}

function DashboardOrAdminDashboard() {
    const { user } = useAuth();
    return user?.isAdmin ? <AdminDashboard /> : <Dashboard />;
}

function UserOrdersComponent() {
    const { user } = useAuth();
    return <UserOrders userId={user?.id} />;
}

function LoginPage() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Login />;
}

function RegisterPage() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Register />;
}

export default App;