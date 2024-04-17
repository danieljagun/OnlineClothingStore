import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ShoppingCart() {
    const { cart, removeItem, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            <ul>
                {cart.items.map(item => (
                    <li key={item._id}>
                        {item.title} - {item.quantity} x ${item.price}
                        <button onClick={() => removeItem(item._id)}>Remove</button>
                    </li>
                ))}
            </ul>
            {cart.items.length > 0 && (
                <>
                    <button onClick={clearCart}>Clear Cart</button>
                    <button onClick={handleCheckout}>Proceed to Checkout</button>
                </>
            )}
        </div>
    );
}

export default ShoppingCart;
