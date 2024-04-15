import React, { useState } from 'react';
import { createItem } from '../services/apiService';

function AddItem() {
    const [itemData, setItemData] = useState({
        title: '',
        manufacturer: '',
        price: 0,
        category: '',
        image: '',
        stock: 0
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setItemData({ ...itemData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assume admin token is stored
        createItem(itemData, token)
            .then(response => {
                alert('Item added successfully!');
            })
            .catch(error => {
                setError('Failed to add item: ' + error.message);
                console.error('Add item failed:', error);
            });
    };

    return (
        <div>
            <h1>Add New Item</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={itemData.title} onChange={handleChange} />
                </label>
                <label>
                    Manufacturer:
                    <input type="text" name="manufacturer" value={itemData.manufacturer} onChange={handleChange} />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={itemData.price} onChange={handleChange} />
                </label>
                <label>
                    Category:
                    <input type="text" name="category" value={itemData.category} onChange={handleChange} />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="image" value={itemData.image} onChange={handleChange} />
                </label>
                <label>
                    Stock:
                    <input type="number" name="stock" value={itemData.stock} onChange={handleChange} />
                </label>
                <button type="submit">Add Item</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default AddItem;
