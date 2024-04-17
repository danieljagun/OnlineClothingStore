import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';

function AdminDashboard() {
    const { items, fetchItems, updateItem, deleteItem } = useApi();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchItems().finally(() => setLoading(false));
    }, [fetchItems]);

    const handleUpdateStock = (itemId, newStock) => {
        updateItem(itemId, { stock: newStock }).then(fetchItems);
    };

    const handleDeleteItem = (itemId) => {
        deleteItem(itemId).then(fetchItems);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {loading ? <p>Loading items...</p> : (
                <ul>
                    {items.map(item => (
                        <li key={item._id}>
                            {item.name} - In Stock: {item.stock}
                            <button onClick={() => handleUpdateStock(item._id, item.stock + 1)}>Increase Stock</button>
                            <button onClick={() => handleUpdateStock(item._id, item.stock - 1)}>Decrease Stock</button>
                            <button onClick={() => handleDeleteItem(item._id)}>Delete Item</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdminDashboard;
