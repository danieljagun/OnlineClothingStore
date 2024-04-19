import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems } from '../services/ApiService';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/CartContext';
import './ItemList.css';

function ItemList({ variant }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {isAuthenticated} = useAuth();
    const {addItem} = useCart();

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
        <>
            <h1 className="items-title">{variant === 'product' ? 'Product List' : 'Items Available, Discounts Available!'}</h1>
            <div className="item-container">
                {Array.isArray(items) && items.map(item => (
                    <div key={item._id} className="item-card">
                        <h3><Link to={`/items/${item._id}`}>{item.title}</Link></h3>
                        <p style={{ fontStyle: 'italic' }}>{item.category}</p>
                        <Link to={`/items/${item._id}`}>
                            <img src={item.image} alt={item.title}/>
                        </Link>
                        <p>Manufacturer: {item.manufacturer}</p>
                        <p>Price: ${item.price}</p>
                        <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ItemList;
