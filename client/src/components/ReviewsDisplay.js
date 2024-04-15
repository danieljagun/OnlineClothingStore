import React, { useEffect, useState } from 'react';
import { fetchReviewsForItem } from '../services/apiService';

function ReviewsDisplay({ itemId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        fetchReviewsForItem(itemId)
            .then(response => {
                setReviews(response.data.data); // Assuming the response format
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
                    <div key={review._id}>
                        <p>Rating: {review.rating}</p>
                        <p>{review.comment}</p>
                        <p>By: {review.user.username}</p>  // Assuming you have user info in the review
                    </div>
                ))
            ) : <p>No reviews yet.</p>}
        </div>
    );
}

export default ReviewsDisplay;
