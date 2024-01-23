// /* eslint-disable no-unused-vars */
// /* eslint-disable prefer-destructuring */
// /* eslint-disable no-underscore-dangle */
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const OrderSuccess = () => {
//   // const [cartItems, setCartItems] = useState([]);
//   const orderInfo = JSON.parse(sessionStorage.getItem('confirmOrder'));
//   const cartInfo = JSON.parse(sessionStorage.getItem('cartItems'));
//   const streetAddress = orderInfo.shippingInfo.streetAddress;
//   const city = orderInfo.shippingInfo.city;
//   const state = orderInfo.shippingInfo.state;
//   const fullAddress = `${streetAddress ? `${streetAddress}, ` : ''}${
//     city || ''
//   }${state ? `, ${state}` : ''}`;
//   const localData = JSON.parse(sessionStorage.getItem('shippingInfo'));
//   const restaurantId = JSON.parse(sessionStorage.getItem('zipCode'));
//   // const restaurantBranch = JSON.parse(sessionStorage.getItem('branch'));
//   const deliveryInstruction = JSON.parse(
//     sessionStorage.getItem('deliveryInstruction')
//   );
//   const orderNotes = JSON.parse(sessionStorage.getItem('orderNotes'));
//   // const [cartItems, setCartItems] = useState(cartInfo);
//   const createOrder = async () => {
//     try {
//       console.log(fullAddress);
//       const response = await axios.post('/api/order/new', {
//         shipping: {
//           name: `${localData.name} ${localData.lastName}`,
//           email: localData.email,
//           phone: localData.mobileNumber,
//           address: {
//             user: localData.name,
//             email: localData.email,
//             phone: localData.mobileNumber,
//             line1: localData.streetAddress,
//             city: localData.city,
//             orderType: localData.orderType,
//             state: localData.state,
//             postalCode: localData.zipCode,
//             country: localData.country
//           }
//         },
//         items: cartInfo.map((cartItem) => ({
//           name: cartItem.name,
//           image:
//             Array.isArray(cartItem.image) && cartItem.image.length > 0
//               ? cartItem.image[0]
//               : 'https://via.placeholder.com/20',
//           price: cartItem.price,
//           itemQuantity: cartItem.quantity
//         })),
//         orderNotes,
//         deliveryInstruction,
//         itemsPrice: orderInfo.orderSummary.estimatedTotal,
//         taxPrice: orderInfo.orderSummary.tax,
//         shippingPrice: orderInfo.orderSummary.shipping,
//         totalPrice: orderInfo.orderSummary.total,
//         paymentInfo: orderInfo.paymentInfo,
//         restaurantId,
//         // restaurantBranch,
//         pickup: orderInfo.shippingInfo.orderType,
//         selectedTimeSlot: localData.selectedTimeSlot
//       });

//       console.log('Order created successfully:', response.data.order);
//       sessionStorage.removeItem('cartItems');
//     } catch (error) {
//       console.error('Error creating order:', error.message);
//     }
//   };
//   useEffect(() => {
//     createOrder();
//   }, []);

//   return (
//     <div>
//       <div className="row justify-content-center">
//         <div className="col-6 mt-5 text-center">
//           <img
//             className="my-5 img-fluid d-block mx-auto"
//             src="https://static.vecteezy.com/system/resources/thumbnails/001/622/545/original/success-check-mark-icon-animation-video.jpg"
//             alt="Order Success"
//             width="200"
//             height="200"
//           />

//           <h2>Your Order has been placed successfully.</h2>

//           <Link to="/userOrderList">Go to Orders</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrderSuccess = () => {
  // const [cartItems, setCartItems] = useState([]);
  const orderInfo = JSON.parse(sessionStorage.getItem('confirmOrder'));
  const cartInfo = JSON.parse(sessionStorage.getItem('cartItems'));
  const streetAddress = orderInfo.shippingInfo.streetAddress;
  const city = orderInfo.shippingInfo.city;
  const state = orderInfo.shippingInfo.state;
  const fullAddress = `${streetAddress ? `${streetAddress}, ` : ''}${
    city || ''
  }${state ? `, ${state}` : ''}`;
  const localData = JSON.parse(sessionStorage.getItem('shippingInfo'));
  const restaurantId = JSON.parse(sessionStorage.getItem('zipCode'));
  const restaurantBranch = JSON.parse(
    sessionStorage.getItem('restaurantBranch')
  );
  const deliveryInstruction = JSON.parse(
    sessionStorage.getItem('deliveryInstruction')
  );
  const orderNotes = JSON.parse(sessionStorage.getItem('orderNotes'));
  // const [cartItems, setCartItems] = useState(cartInfo);
  const createOrder = async () => {
    try {
      console.log(fullAddress);
      const response = await axios.post('/api/order/new', {
        shipping: {
          name: `${localData.name} ${localData.lastName}`,
          email: localData.email,
          phone: localData.mobileNumber,
          address: {
            user: localData.name,
            email: localData.email,
            phone: localData.mobileNumber,
            line1: localData.streetAddress,
            city: localData.city,
            orderType: localData.orderType,
            state: localData.state,
            postalCode: localData.zipCode,
            country: localData.country
          }
        },
        items: cartInfo.map((cartItem) => ({
          name: cartItem.name,
          image:
            Array.isArray(cartItem.image) && cartItem.image.length > 0
              ? cartItem.image[0]
              : 'https://via.placeholder.com/20',
          price: cartItem.price,
          itemQuantity: cartItem.quantity
        })),
        orderNotes,
        deliveryInstruction,
        itemsPrice: orderInfo.orderSummary.estimatedTotal,
        taxPrice: orderInfo.orderSummary.tax,
        shippingPrice: orderInfo.orderSummary.shipping,
        totalPrice: orderInfo.orderSummary.total,
        paymentInfo: orderInfo.paymentInfo,
        restaurantId,
        restaurantBranch,
        pickup: orderInfo.shippingInfo.orderType,
        selectedTimeSlot: localData.selectedTimeSlot
      });

      console.log('Order created successfully:', response.data.order);
      sessionStorage.removeItem('cartItems');
    } catch (error) {
      console.error('Error creating order:', error.message);
    }
  };
  useEffect(() => {
    createOrder();
  }, []);

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="https://static.vecteezy.com/system/resources/thumbnails/001/622/545/original/success-check-mark-icon-animation-video.jpg"
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Your Order has been placed successfully.</h2>

          {/* <Link to="/userOrderList">Go to Orders</Link> */}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
