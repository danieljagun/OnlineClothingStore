const cardNumberPattern = /^\d{16}$/; // 16-digit card number without spaces
const cvvPattern = /^\d{3}$/; // 3-digit CVV code
const expirationDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // MM/YY format

const validateCardNumber = (cardNumber) => {
    // Remove any spaces that might be formatted by the client
    const cleanCardNumber = cardNumber.replace(/\s+/g, '');
    return cardNumberPattern.test(cleanCardNumber);
};

const validateCvv = (cvv) => {
    return cvvPattern.test(cvv);
};

const validateExpirationDate = (expirationDate) => {
    if (!expirationDatePattern.test(expirationDate)) return false;

    const [month, year] = expirationDate.split('/');
    const expYear = parseInt(year, 10) + 2000;
    const expDate = new Date(expYear, month - 1, 1);

    return expDate >= new Date();
};

const validatePaymentDetails = (paymentDetails) => {
    console.log("Validating Payment Details:", paymentDetails);
    const isCardNumberValid = validateCardNumber(paymentDetails.cardNumber);
    const isCvvValid = validateCvv(paymentDetails.cvv);
    const isExpirationDateValid = validateExpirationDate(paymentDetails.expirationDate);
    console.log(`Validation Results - Card Number: ${isCardNumberValid}, CVV: ${isCvvValid}, Expiration Date: ${isExpirationDateValid}`);
    return isCardNumberValid && isCvvValid && isExpirationDateValid;
};

module.exports = {
    validateCardNumber,
    validateCvv,
    validateExpirationDate,
    validatePaymentDetails,
};
