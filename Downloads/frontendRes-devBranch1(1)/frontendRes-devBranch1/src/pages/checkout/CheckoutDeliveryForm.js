/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import './CheckoutForm.css';

const CheckoutDeliveryForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    address: '',
    aptSuite: '',
    zipcode: '',
    city: '',
    state: '',
    country: '',
    deliveryInstructions: '',
    orderNotes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic
  };

  return (
    <div>
      <div className="checkout-page">
        <div className="checkout-section">
          <h1>Checkout</h1>
          {/* Steps: Checkout -> Delivery Details -> Payment */}
          <div className="checkout-steps">
            <span>Checkout</span> - <span>Delivery Details</span> -{' '}
            <span>Payment</span>
          </div>
          <div className="shopping-cart">
            {/* Map through cart items here */}
            <div className="cart-item">
              <img src="pumpkin_sambar.png" alt="Pumpkin Sambar" />
              <div>
                <h2>PUMPKIN SAMBAR 24 Oz</h2>
                <p>$15.00</p>
                {/* Quantity controls */}
              </div>
            </div>
            {/* Repeat for other items */}
          </div>
          <div className="delivery-information">
            <h2>Delivery Information</h2>
            {/* Delivery address and date */}
          </div>
          <div className="add-tip">
            <h2>Add Tip</h2>
            {/* Tip percentage buttons */}
          </div>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">{/* Summary of order costs */}</div>
          <div className="promo-code-section">
            <input type="text" placeholder="Enter promo code" />
            <button>Apply Code</button>
          </div>
          <div className="summary-total">
            <h2>Grand Total (USD): $49.49</h2>
          </div>
          <div className="checkout-buttons">
            <button>Continue Shopping</button>
            <button>Continue</button>
          </div>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        {/* Personal Details */}
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        {/* Repeat for lastName, email, mobileNumber */}

        {/* Delivery Address */}
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
        {/* Repeat for aptSuite, zipcode, city, state, country */}

        {/* Delivery Instructions */}
        <textarea
          name="deliveryInstructions"
          value={formData.deliveryInstructions}
          onChange={handleChange}
          placeholder="Delivery Instructions"
        />

        {/* Order Notes */}
        <textarea
          name="orderNotes"
          value={formData.orderNotes}
          onChange={handleChange}
          placeholder="Order Notes"
        />

        {/* Submit Button */}
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default CheckoutDeliveryForm;
