import React from 'react';
import { useCart } from '../context/CartContext';

function ShoppingCart() {
    const { cart, removeItem, clearCart } = useCart();

    return (
        <div>
            <h1>Shopping Cart</h1>
            <ul>
                {cart.items.map(item => (
                    <li key={item.id}>
                        {item.title} - {item.quantity} x ${item.price}
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    );
}

export default ShoppingCart;
