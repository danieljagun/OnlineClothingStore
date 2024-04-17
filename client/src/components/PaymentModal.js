import React, { useState } from 'react';
import './PaymentModal.css';

function PaymentModal({ onSubmit, onClose }) {
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');

    const formatCardNumber = (value) => {
        let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(' ') : value;
    };

    const formatExpirationDate = (value) => {
        let v = value.replace(/[^0-9]/g, '');
        if (v.length >= 2) {
            v = v.slice(0, 2) + '/' + v.slice(2, 4);
        }
        return v;
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(formatCardNumber(e.target.value));
    };

    const handleExpirationDateChange = (e) => {
        setExpirationDate(formatExpirationDate(e.target.value));
    };

    const handleSubmission = () => {
        const paymentDetails = {
            cardNumber: cardNumber.replace(/\s/g, ''),
            cvv: cvv,
            expirationDate: expirationDate
        };

        onSubmit({
            email,
            paymentDetails,
            shippingAddress
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Enter Payment Details</h2>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" maxLength="19" value={cardNumber} onChange={handleCardNumberChange} placeholder="Card Number" />
                <input type="text" maxLength="3" value={cvv} onChange={e => setCvv(e.target.value)} placeholder="CVV" />
                <input type="text" maxLength="5" value={expirationDate} onChange={handleExpirationDateChange} placeholder="MM/YY" />
                <textarea value={shippingAddress} onChange={e => setShippingAddress(e.target.value)} placeholder="Shipping Address" />
                <button className="process-btn" onClick={handleSubmission}>Process Order</button>
            </div>
        </div>
    );
}

export default PaymentModal;
