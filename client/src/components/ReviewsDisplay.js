import React, { useEffect, useState } from 'react';
import { fetchReviewsForItem } from '../services/ApiService';

function ReviewsDisplay({ itemId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        fetchReviewsForItem(itemId)
            .then(response => {
                setReviews(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch reviews: ' + error.message);
                setLoading(false);
            });
    }, [itemId]);

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <p><strong>Rating:</strong> {review.rating} <span style={{ fontSize: '14px', color: '#666' }}>{Array(review.rating).fill('★').join('')}</span></p>
                        <p style={{ fontStyle: 'italic' }}>{review.comment}</p>
                        <p style={{ color: '#007BFF' }}>By: {review.user?.username}</p>
                    </div>
                ))
            ) : <p>No reviews yet.</p>}
        </div>
    );
}

export default ReviewsDisplay;
