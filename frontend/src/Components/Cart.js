// Cart.js
import React from 'react';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import './Cart.css';
import Logo from "../Layouts/Header/logo.png"

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user);
  const userName = user.user.name;
  const userEmail = user.user.email;
    

  const generateQuotation = () => {
    const doc = new jsPDF();

    // Set properties for the PDF
    doc.setFont('Helvetica-Oblique', 'normal');
    doc.setFontSize(14);

    // Add Logo
    const logoImg = new Image();
    logoImg.src = Logo; // Assuming Logo is the path to your logo image
    doc.addImage(logoImg, 'PNG', 140, 10, 40, 30); // Adjust the position and size as needed

    // Add content to the PDF
    doc.text('Quotation', 10, 20); // Adjust the position as needed
    doc.text(`Name: ${userName}`, 10, 30); // Adjust the position as needed
    doc.text(`Email: ${userEmail}`, 10, 40); // Adjust the position as needed

    cartItems.forEach((item, index) => {
      const yPosition = 70 + index * 10;
      doc.text(`${item.Description} - Quantity: ${item.Quantity} - Price: ₹ ${item.Price * item.Quantity}`, 10, yPosition);
    });

    // Save the PDF with a unique name
    const fileName = `quotation_${new Date().toISOString()}.pdf`;
    doc.save(fileName);

  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <div className="item-details">
                    <span className="item-name">{item.Description}</span>
                    <span className="item-brand">Brand: {item.Brand}</span>
                    <span className="item-standard">Standard: {item.Standard}</span>
                    <span className="item-certification">Certification: {item.Certification}</span>
                  </div>
                  <div className="item-quantity-price">
                    <span className="item-quantity">Quantity: {item.Quantity}</span>
                    <span className="item-price">Price: ₹{item.Price * item.Quantity}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button className="generate-quotation-button" onClick={generateQuotation}>
            Generate Quotation
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
