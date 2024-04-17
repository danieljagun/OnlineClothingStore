import React, { useState } from 'react';
import { loginUser } from '../services/ApiService';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        loginUser(credentials)
            .then(response => {
                console.log('Login response:', response.data);
                if (response.data.data.token && response.data.data.user) {
                    login(response.data.data.token, response.data.data.user);
                    navigate('/');
                } else {
                    throw new Error("Login response does not contain expected token and user data");
                }
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
