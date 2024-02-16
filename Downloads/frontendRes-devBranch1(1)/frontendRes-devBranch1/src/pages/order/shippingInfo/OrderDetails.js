/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card } from 'react-bootstrap';
import './index.css';

const OrderDetails = ({
  orderType,
  handleOrderTypeChange,
  handleText1,
  textBox1
}) => {
  return (
    <Card className="my-3 p-3">
      <h4>Order Details</h4>
      <div className="mb-3 address-container">
        <label htmlFor="orderType" className="form-label">
          Order Type{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <select
          className="form-select form-select-sm col-xs-2"
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
    </Card>
  );
};

export default OrderDetails;
