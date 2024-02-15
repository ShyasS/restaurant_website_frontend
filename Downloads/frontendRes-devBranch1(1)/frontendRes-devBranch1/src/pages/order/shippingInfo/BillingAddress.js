/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import './index.css';
import { Button } from 'react-bootstrap';

const BillingAddress = ({
  streetAddress,
  postalCode,
  city,
  state,
  country,
  orderType,
  handleStreetAddressChange,
  handleZipCodeChange,
  handleCityChange,
  handleBillingAddressChange,
  handleStateChange
  // handleCountryChange
}) => {
  useEffect(() => {
    const billingAddress = {
      streetAddress,
      postalCode,
      city,
      state,
      country
    };
    localStorage.setItem('billingAddress', JSON.stringify(billingAddress));
  }, [streetAddress, postalCode, city, state, country]);

  return (
    <>
      <h2>Billing Address</h2>
      <div className="mb-3 address-container">
        <label htmlFor="streetAddress" className="form-label">
          Street Address{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <input
          type="text"
          className={`form-control `}
          id="streetAddress"
          value={streetAddress}
          onChange={handleStreetAddressChange}
          required
          placeholder="Field is required"
        />
      </div>
      <div className="mb-3 address-container">
        <label htmlFor="zipCode" className="form-label">
          ZIP Code{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <input
          type="text"
          className={`form-control `}
          id="zipCode"
          value={postalCode}
          onChange={handleZipCodeChange}
          required
          placeholder="Field is required"
        />
      </div>
      <div className="mb-3 address-container">
        <label htmlFor="city" className="form-label">
          City{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <input
          type="text"
          className={`form-control `}
          id="city"
          value={city}
          onChange={handleCityChange}
          required
          placeholder="Field is required"
        />
      </div>
      <div className="mb-3 address-container">
        <label htmlFor="state" className="form-label">
          State{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <input
          type="text"
          className={`form-control `}
          id="state"
          value={state}
          onChange={handleStateChange}
          required
          placeholder="Field is required"
        />
      </div>
      <div className="mb-3 address-container">
        <label htmlFor="state" className="form-label">
          Country{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <input
          type="text"
          className={`form-control `}
          id="country"
          value={country}
          // onChange={handleCountryChange}
          required
          disabled
          placeholder="Field is required"
        />
        {orderType === 'Pickup' && (
          <div>
            <Button className="mt-2" onClick={handleBillingAddressChange}>
              Check Address
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default BillingAddress;
