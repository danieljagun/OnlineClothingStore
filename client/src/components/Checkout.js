import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/authContext';
import PaymentModal from './PaymentModal';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/ApiService';
import './Checkout.css';

function Checkout() {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('User token available:', user?.token);
    }, [user?.token]);

    const calculateTotal = () => {
        return cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    const handleOrderSubmission = async (paymentDetails) => {
        if (!user || !user._id) {
            console.error('User information is missing.');
            return;
        }

        const orderData = {
            items: cart.items.map(({ _id, quantity }) => ({ item: _id, quantity })),
            paymentDetails,
            shippingAddress: paymentDetails.shippingAddress,
            email: paymentDetails.email,
            userId: user._id
        };

        try {
            const response = await createOrder(orderData, user.token); // Pass user token to createOrder function
            navigate('/confirmation', { state: { orderDetails: response.data } });
            clearCart();
        } catch (error) {
            console.error('Failed to process order:', error);
            alert(`Failed to process order: ${error.message || 'An unexpected error occurred'}`);
        }
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            {cart.items.length > 0 ? (
                <div>
                    <ul className="checkout-list">
                        {cart.items.map((item) => (
                            <li key={item._id} className="checkout-item">
                                <div className="item-image-container">
                                    <img src={item.image} alt={item.title} className="checkout-item-image"/>
                                </div>
                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="checkout-total">
                        <strong>Total: ${calculateTotal()}</strong>
                    </div>
                    <div className="pay-now-container">
                        <button className="pay-now-btn" onClick={() => setShowModal(true)}>Pay Now</button>
                    </div>
                    {showModal && <PaymentModal onSubmit={handleOrderSubmission} onClose={() => setShowModal(false)} />}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default Checkout;
