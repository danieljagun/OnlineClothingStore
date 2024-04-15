import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Adjust the path as necessary
import './NavBar.css'; // Make sure to create a corresponding CSS file

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth(); // Destructure isAuthenticated and logout from auth context

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
