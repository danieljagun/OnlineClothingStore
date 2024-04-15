import React from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewsDisplay from './ReviewsDisplay';

function ItemDetail() {
    const { itemId } = useParams(); // Get item ID from URL params

    return (
        <div>
            <h1>Item Details</h1>
            {/* Assuming you have a way to display item details here */}
            <ReviewsDisplay itemId={itemId} />
            <ReviewForm itemId={itemId} />
        </div>
    );
}

export default ItemDetail;
