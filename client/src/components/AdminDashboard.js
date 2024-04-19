import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { fetchItems, fetchOrders } from '../services/ApiService';

function AdminDashboard() {
    console.log("AdminDashboard rendering");
    const { token } = useAuth();
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        console.log("Attempting to fetch data with token:", token);
        setLoading(true);
        try {
            const itemsResponse = await fetchItems(token);
            const ordersResponse = await fetchOrders(token);
            console.log("Items fetched:", itemsResponse.data);
            console.log("Orders fetched:", ordersResponse.data);
            setItems(itemsResponse.data);
            setOrders(ordersResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={() => loadData()}>Load Data</button>
            {loading && <p>Loading...</p>}
            {!loading && (
                <>
                    <h2>Items</h2>
                    <ul>
                        {items.map(item => (
                            <li key={item._id}>
                                {item.title} - Stock: {item.stock}
                            </li>
                        ))}
                    </ul>
                    <h2>Orders</h2>
                    <ul>
                        {orders.map(order => (
                            <li key={order._id}>
                                Order ID: {order._id} - Total: ${order.total}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default AdminDashboard;
