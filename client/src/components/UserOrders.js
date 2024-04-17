import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserOrders({ userId }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/orders/user/${userId}`)
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    }, [userId]);

    return (
        <div>
            <h2>User Orders</h2>
            {orders.map(order => (
                <div key={order._id}>
                    <p>Order ID: {order._id}</p>
                    <p>Total: ${order.total}</p>
                </div>
            ))}
        </div>
    );
}

export default UserOrders;
