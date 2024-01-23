/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import axios from 'axios';
import ReusableTable from '../../components/ReusableTable';
import './index.css';
// import Sidebar from './Sidebar';

const OrdersTable = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { restaurantId } = user;
  const { role } = user;
  const [orders, setOrders] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(restaurantId || 'all');
  const headers = [
    'Sl No',
    'Order ID',
    'Customer',
    'Restaurant Branch',
    'Status'
  ];
  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const fetchOrders = async () => {
    try {
      let response;

      if (selectedBranch === 'all') {
        response = await axios.get('/api/admin/orders/active');
      } else {
        const restaurantId = { restaurantId: selectedBranch };
        response = await axios.post(
          '/api/admin/orderHistory-active',
          restaurantId
        );
      }

      // Extract the orders array from the response, handling both object and array responses
      const orders = Array.isArray(response.data)
        ? response.data
        : response.data.orders;

      setOrders(orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleEdit = (orderId) => {
    navigate(`/admin/order/${orderId}`);
    console.log(`Edit order with ID ${orderId}`);
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedBranch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="col-12 col-lg-3 mt-5">
            <div className="form-group">
              {role !== 'admin' && (
                <select
                  className="form-control"
                  name="status"
                  value={selectedBranch}
                  onChange={handleBranchChange}
                >
                  <h4 className="my-4">Select branch</h4>
                  <option value="all">All</option>
                  <option value="1000010">Branch-A</option>
                  <option value="1000011">Branch-B</option>
                  <option value="1000012">Branch-C</option>
                </select>
              )}
            </div>
            {/* Remove the Submit button as it's no longer needed */}
          </div>
          <ReusableTable
            data={orders}
            headers={headers}
            onEdit={(orderId) => handleEdit(orderId)}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
