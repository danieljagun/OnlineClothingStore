import React, { useState } from 'react';
import { fetchItems } from '../services/ApiService';

function SearchItems() {
    const [searchParams, setSearchParams] = useState({
        category: '',
        manufacturer: '',
        title: '',
        sort: 'price'
    });
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearchParams(prevParams => ({ ...prevParams, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const filteredParams = Object.fromEntries(
            Object.entries(searchParams).filter(([_, value]) => value.trim() !== '')
        );
        try {
            const response = await fetchItems(filteredParams);
            setItems(response.data.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch items: ' + error.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Search Items</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="category"
                    value={searchParams.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                />
                <input
                    type="text"
                    name="manufacturer"
                    value={searchParams.manufacturer}
                    onChange={handleInputChange}
                    placeholder="Manufacturer"
                />
                <input
                    type="text"
                    name="title"
                    value={searchParams.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                />
                <select name="sort" value={searchParams.sort} onChange={handleInputChange}>
                    <option value="price">Price</option>
                    <option value="-price">Price Desc</option>
                    <option value="manufacturer">Manufacturer</option>
                </select>
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        {item.title} - {item.manufacturer} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchItems;
