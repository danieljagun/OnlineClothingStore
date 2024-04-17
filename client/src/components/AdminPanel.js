import React, { useState, useEffect } from 'react';
import { fetchItems, updateItem, fetchOrders } from '../services/ApiService';
import { useAuth } from '../context/authContext';

function AdminPanel() {
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const loadData = async () => {
            if (user?.token) {
                try {
                    const fetchedItemsResponse = await fetchItems(user.token);
                    setItems(fetchedItemsResponse.data);

                    const fetchedOrdersResponse = await fetchOrders(user.token);
                    setOrders(fetchedOrdersResponse.data);
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            }
        };
        loadData();
    }, [user?.token]);

    const handleStockChange = (itemId, newStock) => {
        if (newStock >= 0) {
            updateItem(itemId, { stock: newStock }, user?.token).then(() => {
                setItems(items.map(item => item._id === itemId ? { ...item, stock: newStock } : item));
            }).catch(error => console.error('Failed to update item:', error));
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <h2>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        Order ID: {order._id}, Total: ${order.total}, User: {order.userId}
                    </li>
                ))}
            </ul>
            <h2>Items</h2>
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        {item.title} - In Stock: {item.stock}
                        <button onClick={() => handleStockChange(item._id, item.stock + 1)}>Increase</button>
                        <button onClick={() => handleStockChange(item._id, item.stock - 1)}>Decrease</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
