import React from 'react';
import { useLocation } from 'react-router-dom';

function Confirmation() {
    const location = useLocation();
    const { orderDetails } = location.state || {};

    return (
        <div>
            <h1>Order Confirmation</h1>
            <p>Thank you for your order, email with Order ID will be sent shortly! {orderDetails.email}</p>
        </div>
    );
}

export default Confirmation;
