import React, { useState } from 'react';
import { registerUser } from '../services/apiService';
import { useAuth } from '../context/authContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate

function Register() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        shippingAddress: '',
        paymentMethod: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth(); // Destructure login function from context
    const navigate = useNavigate(); // Correctly define navigate

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(userData)
            .then(response => {
                login(response.data.token, response.data.user); // Log in the user automatically
                navigate('/dashboard'); // Redirect to dashboard or other page post-login using navigate
                alert('Registration successful!');
            })
            .catch(error => {
                setError('Registration failed: ' + error.message);
                console.error('Registration failed:', error);
            });
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={userData.username} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={userData.email} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={userData.password} onChange={handleChange} />
                </label>
                <label>
                    Shipping Address:
                    <input type="text" name="shippingAddress" value={userData.shippingAddress} onChange={handleChange} />
                </label>
                <label>
                    Payment Method:
                    <input type="text" name="paymentMethod" value={userData.paymentMethod} onChange={handleChange} />
                </label>
                <button type="submit">Register</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Register;