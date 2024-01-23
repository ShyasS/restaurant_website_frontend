/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReusableTable from '../../components/ReusableTable';
// import SearchBar from '../../components/Search';
// import Sidebar from './Sidebar';

const OrdersHistory = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { restaurantId } = user;
  const { role } = user;
  const [orders, setOrders] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(restaurantId || 'all');

  const headers = ['Sl No', 'Order ID', 'Customer', 'Restaurant Branch'];
  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const fetchOrders = async () => {
    try {
      let response;

      if (selectedBranch === 'all') {
        response = await axios.get('/api/admin/orders');
      } else {
        const restaurantId = { restaurantId: selectedBranch };
        response = await axios.post(
          '/api/admin/orderHistory-nonActive',
          restaurantId
        );
      }

      const orders = Array.isArray(response.data)
        ? response.data
        : response.data.orders;

      setOrders(orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const onViewDetails = (id) => {
    console.log(`View details for order with ID ${id}`);
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedBranch]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h2>Orders History</h2>
          {/* Your search bar can go here */}
          {/* <SearchBar onSearch={handleSearch} /> */}
          <div className="col-12 col-lg-3 mt-5">
            <div className="form-group">
              {role !== 'admin' && (
                <select
                  className="form-control"
                  name="status"
                  value={selectedBranch}
                  onChange={handleBranchChange}
                >
                  <h4 className="my-4">Select a branch</h4>
                  <option value="all">All</option>
                  <option value="1000010">Branch-A</option>
                  <option value="1000011">Branch-B</option>
                  <option value="1000012">Branch-C</option>
                </select>
              )}
            </div>
            {/* Remove the Submit button as it's no longer needed */}
          </div>
          {/* Render the ReusableTable component with the fetched orders */}
          <ReusableTable
            headers={headers}
            data={orders}
            onViewDetails={onViewDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersHistory;
