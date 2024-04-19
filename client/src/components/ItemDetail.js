import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemById } from '../services/ApiService';
import ReviewForm from './ReviewForm';
import ReviewsDisplay from './ReviewsDisplay';

function ItemDetail() {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        fetchItemById(itemId)
            .then(response => {
                setItem(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch item details.');
                console.error('Error fetching item details:', err);
                setLoading(false);
            });
    }, [itemId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Item Details</h1>
            {item && (
                <>
                    <h2>{item.title}</h2>
                    <img src={item.image} alt={item.title} style={{ width: '100px' }} />
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                </>
            )}
            <ReviewsDisplay itemId={itemId} />
            <ReviewForm itemId={itemId} />
        </div>
    );
}

export default ItemDetail;
