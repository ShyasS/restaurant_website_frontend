/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReusableTable from '../../components/ReusableTable';

const OrdersTable = () => {
  const navigate = useNavigate();
  const [currentOrders, setCurrentOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem('user'));
  const user = userId._id;

  const headers = ['Order ID', 'Restaurant Branch', 'Status'];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/myorders?userId=${user}`, {
          withCredentials: true
        });

        const { order } = response.data;
        const delivered = order.filter(
          (order) => order.orderStatus === 'Delivered'
        );
        const current = order.filter(
          (order) => order.orderStatus !== 'Delivered'
        );

        setDeliveredOrders(delivered);
        setCurrentOrders(current);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  function handleView(_id) {
    navigate(`/order/${_id}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const noCurrentOrders = currentOrders.length === 0;
  const noDeliveredOrders = deliveredOrders.length === 0;

  if (noCurrentOrders && noDeliveredOrders) {
    // Optionally, you can render a message or hide the component entirely
    return <div>No orders available.</div>;
  }

  return (
    <div className="container col-lg-8 custom-table my-5">
      <div className="row">
        <div className="col my-5">
          {!noCurrentOrders && (
            <>
              <h2>Current Orders</h2>
              <ReusableTable
                data={currentOrders}
                headers={headers}
                onViewDetails={handleView}
              />
            </>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col my-5">
          {!noDeliveredOrders && (
            <>
              <h2>Delivered Orders</h2>
              <ReusableTable
                data={deliveredOrders}
                headers={headers}
                onViewDetails={handleView}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
