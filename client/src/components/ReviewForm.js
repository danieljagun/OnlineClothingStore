import React, { useState } from 'react';
import { postReview } from '../services/apiService';
import { useAuth } from '../context/authContext';

function ReviewForm({ itemId }) {
    const [reviewData, setReviewData] = useState({
        rating: '',
        comment: ''
    });
    const { user, token } = useAuth(); // Access user and token from Auth context
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setError('You must be logged in to post a review.');
            return;
        }
        try {
            await postReview({ ...reviewData, item: itemId, user: user._id }, token);
            alert('Review submitted successfully!');
            setReviewData({ rating: '', comment: '' }); // Reset form after submission
        } catch (error) {
            setError('Failed to submit review: ' + error.message);
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div>
            <h2>Write a Review</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <select name="rating" value={reviewData.rating} onChange={handleChange}>
                        <option value="">Select a Rating</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                    </select>
                </label>
                <label>
                    Comment:
                    <textarea name="comment" value={reviewData.comment} onChange={handleChange} />
                </label>
                <button type="submit">Submit Review</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default ReviewForm;
