import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './NavBar.css';

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li className={location.pathname === '/' ? 'nav-item active' : 'nav-item'}>
                    <Link to="/">Home</Link>
                </li>
                <li className={location.pathname === '/search-items' ? 'nav-item active' : 'nav-item'}>
                    <Link to="/search-items">Search Items</Link>
                </li>
                <li className={location.pathname === '/shopping-cart' ? 'nav-item active' : 'nav-item'}>
                    <Link to="/shopping-cart">Shopping Cart</Link>
                </li>
                {isAuthenticated && user.isAdmin && (
                    <>
                        <li className={location.pathname === '/admin' ? 'nav-item active' : 'nav-item'}>
                            <Link to="/admin">Admin Dashboard</Link>
                        </li>
                        <li className={location.pathname === '/add-item' ? 'nav-item active' : 'nav-item'}>
                            <Link to="/add-item">Add Item</Link>
                        </li>
                    </>
                )}
                {isAuthenticated ? (
                    <li className="nav-item">
                        <button onClick={handleLogout} className="nav-link-button">Logout</button>
                    </li>
                ) : (
                    <>
                        <li className={location.pathname === '/login' ? 'nav-item active' : 'nav-item'}>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className={location.pathname === '/register' ? 'nav-item active' : 'nav-item'}>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
