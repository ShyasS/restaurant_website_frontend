/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-underscore-dangle */
// /* eslint-disable react/prop-types */

// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';

// const OrderDetails = () => {
//   const { id } = useParams();
//   const [orderData, setOrderData] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await fetch(`/api/order/${id}`);
//         const data = await response.json();

//         if (data.success) {
//           setOrderData(data.order);
//         } else {
//           console.error('Failed to fetch order details:', data.error);
//         }
//       } catch (error) {
//         console.error('Error fetching order details:', error);
//       }
//     };

//     fetchOrderDetails();
//   }, [id]); // Fetch data whenever the order ID changes

//   if (!orderData) {
//     return <p>Loading...</p>;
//   }

//   const {
//     _id,
//     shipping,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//     paidAt,
//     pickup,
//     orderStatus,
//     items
//   } = orderData;

//   return (
//     <div>
//       <div className="row d-flex justify-content-between">
//         <div className="col-12  col-lg-8  mt-2 order-details">
//           <h4 className="my-5">Order Id: {_id}</h4>
//           <hr />
//           <h4 className="mb-4">Shipping Info</h4>
//           <p>
//             <b>Name:</b> {shipping.name}
//           </p>
//           <p>
//             <b>Phone:</b> {shipping.phone}
//           </p>
//           <p>
//             <b>Order type:</b> {pickup}
//           </p>
//           <p className="mb-4">
//             <b>Address:</b> {shipping.address.line1}, {shipping.address.city},{' '}
//             {shipping.address.state}, {shipping.address.country}
//           </p>

//           <p
//             className={`my-4 ${
//               orderStatus === 'Delivered' ? 'greenColor' : 'redColor'
//             }`}
//           >
//             <b>Order Status:</b> {orderStatus}
//           </p>
//           <hr />
//           <h4 className="my-4">Order Items:</h4>
//           {items.map((item) => (
//             <div key={item._id} className="cart-item my-1">
//               <div className="row my-5">
//                 <div className="col-4 col-lg-2">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     height="45"
//                     width="65"
//                   />
//                 </div>

//                 <div className="col-5 col-lg-5">
//                   <Link to={`/menu/${item.id}`}>{item.name}</Link>
//                 </div>

//                 <div className="col-4 col-lg-2 mt-4 mt-lg-0">
//                   <p>${item.price}</p>
//                 </div>

//                 <div className="col-4 col-lg-3 mt-4 mt-lg-0">
//                   <p>{item.itemQuantity} Piece(s)</p>
//                 </div>
//                 <hr />
//               </div>
//             </div>
//           ))}
//           <h4 className="my-4">Payment</h4>
//           <p>
//             <b>Paid at</b>: {paidAt}
//           </p>
//           <p>
//             <b>Tax:</b> ${taxPrice}
//           </p>
//           <p>
//             <b>Shipping:</b> ${shippingPrice}
//           </p>
//           <p>
//             <b>Amount:</b> ${totalPrice}
//           </p>
//           <hr />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
// import Sidebar from './Sidebar';

const OrderDetails = () => {
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

  useEffect(() => {
    // Fetch order details when the component mounts
    fetchOrderDetails(id);
  }, [id]); // Empty dependency array ensures the effect runs only once

  return (
    <div className="container">
      <div className="row custom-table mx-auto mt-4 mb-4">
        <div className="col">
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-4 order-details">
              <h4 className="my-4">
                <b>Order Info</b>
              </h4>
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
              <p
                style={{
                  display: 'flex',
                  marginBottom: '1rem'
                }}
              >
                <b className="mx-2">Phone:</b>{' '}
                {orderDetails?.shipping.phone || 'not found'}
              </p>
              <p
                style={{
                  display: 'flex',
                  marginBottom: '1rem'
                }}
              >
                <b className="">Billing Address:</b>{' '}
                {orderDetails?.shipping?.address?.line1 || ''},{' '}
                {orderDetails?.shipping.address.city || ''},{' '}
                {orderDetails?.shipping.address.state || ''},{' '}
                {orderDetails?.shipping.address.country || ''},
                {orderDetails?.shipping.address.postalCode || ''}
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
                  {orderDetails?.delivery?.line1 || ''},{' '}
                  {orderDetails?.delivery?.city || ''},{' '}
                  {orderDetails?.delivery?.state || ''},{' '}
                  {orderDetails?.delivery?.country || ''},
                  {orderDetails?.delivery?.postalCode || ''}
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
              <p
                style={{ display: 'flex', marginBottom: '1rem' }}
                className={`my-4 ${
                  orderDetails?.orderStatus === 'Delivered'
                    ? 'greenColor'
                    : 'redColor'
                }`}
              >
                <b className="mx-2">Order Status:</b>{' '}
                {orderDetails?.orderStatus}
              </p>
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Order Instruction:</b>{' '}
                {orderDetails?.orderInstruction || '-'}
              </p>
              <p style={{ display: 'flex', marginBottom: '1rem' }}>
                <b className="mx-2">Delivery Instruction :</b>{' '}
                {orderDetails?.deliveryInstruction || '-'}
              </p>
              <div />
            </div>

            <div className="col-12 col-lg-8 mt-5">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
