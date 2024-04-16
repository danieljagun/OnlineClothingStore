import React, { useState } from 'react';
import { loginUser } from '../services/ApiService';
import { useAuth } from '../context/authContext';  // Import useAuth hook
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation after login

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();  // Destructure login function from context
    const navigate = useNavigate();  // Get the navigate function to redirect after login

    const handleLogin = (event) => {
        event.preventDefault();
        loginUser(credentials)
            .then(response => {
                login(response.data.token, response.data.user);  // Update auth context
                navigate('/');  // Redirect to home page or dashboard
            })
            .catch(error => {
                setError('Failed to login: ' + error.message);
                console.error('Login failed:', error);
            });
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                </label>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Login;
