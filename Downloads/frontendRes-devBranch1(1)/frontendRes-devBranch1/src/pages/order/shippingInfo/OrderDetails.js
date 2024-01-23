/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import './index.css';

const OrderDetails = ({
  orderType,
  handleOrderTypeChange,
  handleText1,
  textBox1
}) => {
  return (
    <div className="mt-3">
      <h2>Order Details</h2>
      <div className="mb-3 address-container">
        <label htmlFor="orderType" className="form-label">
          Order Type{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <select
          className={`form-select `}
          id="orderType"
          value={orderType}
          onChange={handleOrderTypeChange}
          required
        >
          <option value="" disabled>
            Select
          </option>
          <option value="Pickup">Pickup</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>
      <div className="mb-3 address-container">
        <label htmlFor="orderNotes" className="form-label">
          Order Notes
        </label>
        <textarea
          type="text"
          className={`form-control `}
          name="orderNotes"
          value={textBox1}
          onChange={handleText1}
          placeholder="Order Notes"
        />
      </div>
    </div>
  );
};

export default OrderDetails;
