import React from 'react';
import {QRCodeSVG} from 'qrcode.react';

function Test() {
  // UPI details
  const upiId = 'mauryaravi599-4@okicici'; // Replace with the receiver's UPI ID
  const amount = '2990'; // Optional: Replace with the payment amount
  const note = 'Payment for check upi code'; // Optional: Payment note

  // UPI URL format: upi://pay?pa=UPI_ID&am=AMOUNT&cu=INR&pn=NAME&tn=NOTE
  const upiUrl = `upi://pay?pa=${upiId}&am=${amount}&cu=INR&pn=Name&tn=${note}`;

  return (
    <div>
      <h2>UPI QR Code</h2>
      <QRCodeSVG value={upiUrl} />
    </div>
  );
}

export default Test;
