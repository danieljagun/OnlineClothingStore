import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/ApiService';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/CartContext'; // Import useCart

function ItemList({ variant }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { isAuthenticated } = useAuth();
    const { addItem } = useCart(); // Use addItem from cart context

    useEffect(() => {
        setLoading(true);
        fetchItems()
            .then(response => {
                setItems(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch items: ' + error.message);
                setLoading(false);
            });
    }, []);

    const handleAddToCart = (item) => {
        if (!isAuthenticated) {
            alert("Please log in to add items to the cart.");
            return;
        }
        addItem(item); // Add item to cart using context
        alert("Added to cart!");
    };

    if (loading) return <p>Loading items...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>{variant === 'product' ? 'Product List' : 'Items Available'}</h1>
            {Array.isArray(items) && items.map(item => (
                <div key={item._id} style={variant === 'product' ? { listStyleType: 'none' } : null}>
                    <h3>{item.title}</h3>
                    <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px' }} />
                    <p>Manufacturer: {item.manufacturer}</p>
                    <p>Price: ${item.price}</p>
                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
}

export default ItemList;
