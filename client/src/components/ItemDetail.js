import React from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewsDisplay from './ReviewsDisplay';

function ItemDetail() {
    const { itemId } = useParams();

    return (
        <div>
            <h1>Item Details</h1>
            <ReviewsDisplay itemId={itemId} />
            <ReviewForm itemId={itemId} />
        </div>
    );
}

export default ItemDetail;
