/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../checkout/CheckoutForm.css';

const ShippingInfo = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState('Pickup');
  const [selectedTimeSlot, setSelectedTimeSlot] =
    useState('Select time a slot');
  const [timeSlots, setTimeSlots] = useState([]);
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [textBox1, setTextBox1] = useState('');
  const [textBox2, setTextBox2] = useState('');
  const [name, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  // const restaurantId = JSON.parse(localStorage.getItem('zipCode'));

  // Function to handle user name change
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  // Function to handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleTimeSlotChange = (e) => {
    const selectedSlot = e.target.value;
    setSelectedTimeSlot(selectedSlot);
    localStorage.setItem('selectedTimeSlot', JSON.stringify(selectedSlot));
  };

  // Function to handle mobile number change
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleText1 = (e) => {
    const orderNotes = e.target.value;
    setTextBox1(orderNotes);
    localStorage.setItem('orderNotes', JSON.stringify(orderNotes));
  };
  const handleText2 = (e) => {
    const deliveryInstruction = e.target.value;
    setTextBox2(deliveryInstruction);
    localStorage.setItem(
      'deliveryInstruction',
      JSON.stringify(deliveryInstruction)
    );
  };
  // Function to handle order type change
  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };

  // Function to handle time slot change
  // const handleTimeSlotChange = (e) => {
  //   setSelectedTimeSlot(e.target.value);
  // };

  // Function to handle street address change
  const handleStreetAddressChange = (e) => {
    setStreetAddress(e.target.value);
  };

  // Function to handle city change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  // Function to handle state change
  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  // Function to handle ZIP code change
  const handleZipCodeChange = (e) => {
    setPostal_code(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the entered address data
    const addressData = {
      orderType,
      name,
      lastName,
      email,
      mobileNumber,
      streetAddress,
      city,
      state,
      postal_code,
      country,
      orderInstruction: textBox1,
      deliveryInstruction: textBox2
    };

    // Save all entered information in local storage
    localStorage.setItem('shippingInfo', JSON.stringify(addressData));

    // If the order type is "Delivery," make an API call to save the data
    if (addressData) {
      await saveAddressToApi(addressData);
    }

    // Redirect to the next route
    navigate('/order/confirm');
  };

  // Function to make an API call to save the address data
  const saveAddressToApi = async (addressData) => {
    try {
      // Make an API call to save the data
      const response = await axios.post('/api/address/new', addressData);

      // Handle the response, e.g., check for success
      if (response.status === 200) {
        console.log('Address data saved to API successfully.');
      } else {
        console.error('Error saving address data to API:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving address data to API:', error.message);
    }
  };
  useEffect(() => {
    // Fetch time slots from the API
    const fetchTimeSlots = async () => {
      try {
        const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
        const response = await axios.post('/api/timeSlots', { restaurantId });
        const timeSlotsData = response.data.timeSlots;
        // const timeSlotsData = Array.isArray(response.data) ? response.data : [];
        console.log(timeSlotsData);
        setTimeSlots(timeSlotsData);
      } catch (error) {
        console.error('Error fetching time slots:', error.message);
      }
    };

    fetchTimeSlots();
  }, [selectedTimeSlot]);

  return (
    <div className="container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Personal Details</h2>

        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            value={name}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobileNumber"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
          />
        </div>
        <h2>Order Details</h2>
        <div className="mb-3">
          <label htmlFor="orderType" className="form-label">
            Order Type
          </label>
          <select
            className="form-select"
            id="orderType"
            value={orderType}
            onChange={handleOrderTypeChange}
          >
            <option value="Pickup">Pickup</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>
        {orderType === 'Delivery' && (
          <div>
            <div className="mb-3">
              <label htmlFor="timeSlot" className="form-label">
                Time Slot
              </label>
              <select
                className="form-select"
                id="timeSlot"
                value={selectedTimeSlot}
                onChange={handleTimeSlotChange}
              >
                <option value="">Select a time slot</option>
                {timeSlots &&
                  timeSlots.map((timeSlot) => (
                    <option key={timeSlot._id} value={timeSlot.slot}>
                      {timeSlot.slot}
                    </option>
                  ))}
              </select>
            </div>
            <h2>Billing & Delivery Address</h2>

            <div className="mb-3">
              <label htmlFor="streetAddress" className="form-label">
                Street Address
              </label>
              <input
                type="text"
                className="form-control"
                id="streetAddress"
                value={streetAddress}
                onChange={handleStreetAddressChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="zipCode" className="form-label">
                ZIP Code
              </label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                value={postal_code}
                onChange={handleZipCodeChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                value={city}
                onChange={handleCityChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                value={state}
                onChange={handleStateChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                value={country}
                onChange={handleCountryChange}
              />
            </div>
            <label htmlFor="deliveryInstructions" className="form-label">
              Delivery Instruction
            </label>
            <div className="mb-3">
              <textarea
                name="deliveryInstructions"
                value={textBox2}
                onChange={handleText2}
                placeholder="Delivery Instructions"
              />
            </div>
            <label htmlFor="orderNotes" className="form-label">
              Order Notes
            </label>
            <div className="mb-3">
              <textarea
                name="orderNotes"
                value={textBox1}
                onChange={handleText1}
                placeholder="Order Notes"
              />
            </div>
          </div>
        )}
        {orderType === 'Pickup' && (
          <>
            <div className="mb-3">
              <label htmlFor="pickupTimeSlot" className="form-label">
                Pickup Time Slot
              </label>
              <select
                className="form-select"
                id="pickupTimeSlot"
                value={selectedTimeSlot}
                onChange={handleTimeSlotChange}
              >
                <option value="">Select a time slot</option>
                {timeSlots &&
                  timeSlots.map((timeSlot) => (
                    <option key={timeSlot._id} value={timeSlot.slot}>
                      {timeSlot.slot}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <h2>Billing Address</h2>
              <div className="mb-3">
                <label htmlFor="streetAddress" className="form-label">
                  Street Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="streetAddress"
                  value={streetAddress}
                  onChange={handleStreetAddressChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="zipCode" className="form-label">
                  ZIP Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  value={postal_code}
                  onChange={handleZipCodeChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={city}
                  onChange={handleCityChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  value={state}
                  onChange={handleStateChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  value={country}
                  onChange={handleCountryChange}
                />
              </div>
              <label htmlFor="orderNotes" className="form-label">
                Order Notes
              </label>
              <div className="mb-3">
                <textarea
                  name="orderNotes"
                  value={textBox1}
                  onChange={handleText1}
                  placeholder="Order Notes"
                />
              </div>
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShippingInfo;
