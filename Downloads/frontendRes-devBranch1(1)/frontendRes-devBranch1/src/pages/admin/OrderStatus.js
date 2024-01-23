/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
// import Sidebar from './Sidebar';

const OrderStatus = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [status, setStatus] = useState('');
  const { id } = useParams();

  // Function to fetch order details
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/order/${id}`);
      const orderData = response.data.order;

      if (orderData && Array.isArray(orderData.items)) {
        setOrderDetails(orderData);
        setStatus(orderData.orderStatus);
      } else {
        console.error('Invalid order details response:', orderData);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
  // const updateOrder = orderDetails._id;
  // Function to update order status
  // Function to update order status
  const updateOrderStatus = async () => {
    try {
      // Check if orderDetails and orderDetails.items are defined and items is an array
      if (orderDetails && Array.isArray(orderDetails.items)) {
        const response = await axios.put(
          `/api/admin/order/${orderDetails._id}`,
          {
            orderStatus: status
          }
        );

        if (response.status === 200) {
          console.log('Order status updated successfully');
          // Optionally, you can refetch the order details to reflect the updated status
          fetchOrderDetails(id);
        } else {
          console.error('Failed to update order status');
        }
      } else {
        console.error('Invalid order details:', orderDetails);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    // Fetch order details when the component mounts
    fetchOrderDetails(id);
  }, [id]); // Empty dependency array ensures the effect runs only once

  return (
    <div className="container">
      <div className="row custom-table mx-auto mt-4 mb-4">
        <div className="col">
          <h4 className="my-4">
            <b>Order Info</b>
          </h4>
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-4 order-details">
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <p className="mx-2">
                  <b>Order Id:</b>
                </p>
                {orderDetails?._id}
              </p>

              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Name:</b>
                {`${orderDetails?.shipping.name} ${
                  orderDetails?.shipping.lastName || ''
                }`}
              </p>
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Phone:</b>{' '}
                {orderDetails?.shipping.phone || 'not found'}
              </p>
              <p
                style={{
                  display: 'flex',
                  marginBottom: '1rem',
                  marginLeft: '7px'
                }}
              >
                <b className="">Billing Address:</b>{' '}
                {orderDetails?.shipping.address.line1},{' '}
                {orderDetails?.shipping.address.city},{' '}
                {orderDetails?.shipping.address.state},{' '}
                {orderDetails?.shipping.address.country}
              </p>
              {orderDetails?.delivery && (
                <p
                  style={{
                    display: 'flex',
                    marginBottom: '1rem',
                    marginLeft: '7px'
                  }}
                >
                  <b className="">Delivery Address:</b>{' '}
                  {orderDetails.delivery.line1 || ''},{' '}
                  {orderDetails.delivery.city || ''},{' '}
                  {orderDetails.delivery.state || ''},{' '}
                  {orderDetails.delivery.country || ''},
                  {orderDetails.delivery.postalCode || ''}
                </p>
              )}
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Restaurant:</b>{' '}
                {orderDetails?.restaurantBranch || 'not found'}
              </p>
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Selected time:</b>{' '}
                {orderDetails?.selectedTimeSlot || 'not found'}
              </p>
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Selected Date:</b>{' '}
                {orderDetails?.orderDate || 'not found'}
              </p>
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Order Type:</b>{' '}
                {orderDetails?.orderType || 'not found'}
              </p>
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Total Amount:</b> $
                {orderDetails?.totalPrice}
              </p>
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Payment:</b> {orderDetails?.paymentStatus}
              </p>
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Payment Id:</b> {orderDetails?.paymentInfo}
              </p>
              <div />
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Paid at:</b> {orderDetails?.paidAt}
              </p>
              <div />
            </div>

            {/* <div className="col-12 col-lg-3 mt-5">
              
            </div> */}
            <div className="col-12 col-lg-8 mt-2">
              <h4 className="my-4">Order Items:</h4>

              {orderDetails?.items.length > 0 ? (
                orderDetails?.items.map((item) => (
                  <Card
                    className="cart-item my-3 container col-8"
                    key={item._id}
                  >
                    <div className="row my-2">
                      <div className="col-2 col-lg-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-12 col-lg-6">
                        <Link to={`/menuDetails/${item._id}`}>{item.name}</Link>
                      </div>

                      <div className="col-5 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-7 col-lg-3 mt-4 mt-lg-0">
                        <p>Qty-{item.itemQuantity}</p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p>Items failed to display</p>
              )}
              <div className="container col-12 col-lg-6 mx-auto">
                <p style={{ display: 'flex', marginBottom: '1rem' }}>
                  <b className="mx-2">Order Instruction:</b>{' '}
                  {orderDetails?.orderInstruction || '-'}
                </p>
                <p style={{ display: 'flex', marginBottom: '1rem' }}>
                  <b className="mx-2">Delivery Instruction :</b>{' '}
                  {orderDetails?.deliveryInstruction || '-'}
                </p>
                <h4 className="my-4">Status</h4>
                <p className="my-4">
                  <b>
                    Order Status:{' '}
                    <span style={{ color: 'green' }}>
                      {orderDetails?.orderStatus}
                    </span>
                  </b>
                </p>

                <div className="form-group">
                  <select
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Preparing">Preparing</option>
                    <option value="Out For Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <button
                  type="submit"
                  onClick={updateOrderStatus}
                  className="btn btn-primary btn-block my-4"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
