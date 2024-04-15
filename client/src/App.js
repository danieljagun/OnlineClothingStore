import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import AddItem from './components/AddItem';
import ItemsList from './components/ItemsList';
import SearchItems from './components/SearchItems';
import ShoppingCart from './components/ShoppingCart';
import ItemDetail from './components/ItemDetail';
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
                        {/* Assuming this is your item detail page */}
                        <Route path="/items/:itemId" element={<ItemDetail />} />
                        <Route path="/add-item" element={<AdminRoute><AddItem /></AdminRoute>} />
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
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

function LoginPage() {
    const { isAuthenticated } = useAuth();
    console.log('LoginPage isAuthenticated:', isAuthenticated);
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Login />;
}

function RegisterPage() {
    const { isAuthenticated } = useAuth();
    console.log('RegisterPage isAuthenticated:', isAuthenticated);
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Register />;
}


export default App;
