import React, { useState, useEffect } from 'react';
import { fetchItems, updateItem, deleteItem, fetchOrders } from '../services/ApiService';
import { useAuth } from '../context/authContext';

function AdminPanel() {
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        async function loadData() {
            if (token) {
                try {
                    const fetchedItemsResponse = await fetchItems(token);
                    const fetchedOrdersResponse = await fetchOrders(token);
                    const itemsData = fetchedItemsResponse.data.data || [];

                    // Ensuring the response data is correctly formatted
                    const ordersData = fetchedOrdersResponse.data.map(order => ({
                        ...order,
                        items: order.items.map(orderItem => {
                            const itemDetail = itemsData.find(i => i && i._id === orderItem.item?._id) || {};
                            return {
                                ...orderItem,
                                itemDetail: itemDetail
                            };
                        })
                    }));

                    setItems(itemsData);
                    setOrders(ordersData);
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            } else {
                console.log('No token found, unable to fetch data.');
            }
        }
        loadData();
    }, [token]);

    const handleStockChange = async (itemId, newStock) => {
        if (newStock >= 0) {
            try {
                await updateItem(itemId, { stock: newStock }, token);
                setItems(prevItems => prevItems.map(item =>
                    item._id === itemId ? { ...item, stock: newStock } : item
                ));
            } catch (error) {
                console.error('Failed to update item:', error);
            }
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await deleteItem(itemId, token);
            setItems(prevItems => prevItems.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <h2>Items</h2>
            {items.length > 0 ? (
                <ul>
                    {items.map(item => (
                        <li key={item._id} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
                            {item.title} - In Stock: {item.stock}
                            <button style={{ margin: '0 5px' }} onClick={() => handleStockChange(item._id, item.stock + 1)}>Increase</button>
                            <button style={{ margin: '0 5px' }} onClick={() => handleStockChange(item._id, item.stock - 1)}>Decrease</button>
                            <button style={{ margin: '0 5px' }} onClick={() => handleDeleteItem(item._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : <p>No items to display.</p>}
            <h2>Orders</h2>
            {orders.length > 0 ? (
                <div style={{ marginTop: '20px' }}>
                    {orders.map(order => (
                        <div key={order._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>User ID:</strong> {order.user?.username || 'Unknown'}</p>
                            {order.items.map(item => (
                                <p key={item._id}>
                                    <strong>Item:</strong> {item.itemDetail.title || 'Item not found'}, <strong>Price:</strong> ${item.itemDetail.price || 'N/A'}, <strong>Quantity:</strong> {item.quantity}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            ) : <p>No orders to display.</p>}
        </div>
    );
}

export default AdminPanel;
