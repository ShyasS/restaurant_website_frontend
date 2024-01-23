/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useState, useEffect } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const address = localStorage.getItem('Address');
  const date = localStorage.getItem('selectedDate');
  const branch = localStorage.getItem('branch');
  const [cartItemss, setCartItems] = useState(storedCartItems);
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const time = JSON.parse(localStorage.getItem('selectedTimeSlot'));
  const [showModal, setShowModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [localQuantities, setLocalQuantities] = useState(
    storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {})
  );
  const navigate = useNavigate();
  const handleAdd = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...localQuantities,
      [item._id]: (localQuantities[item._id] || 0) + 1
    };

    setLocalQuantities(updatedQuantities);

    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);

    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('localQuantities', JSON.stringify(updatedQuantities));
  };
  const handleViewDetails = (selectedMenu) => {
    setSelectedMenuItem(selectedMenu);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMinus = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...localQuantities,
      [item._id]: Math.max((localQuantities[item._id] || 0) - 1, 0)
    };

    setLocalQuantities(updatedQuantities);

    const updatedCartItems = cartItems
      .map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: Math.max((cartItem.quantity || 0) - 1, 0)
          };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity > 0);
    setCartItems(updatedCartItems);

    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('localQuantities', JSON.stringify(updatedQuantities));
  };

  const handleDelete = (itemId) => {
    try {
      const storedCartItem =
        JSON.parse(localStorage.getItem('cartItems')) || [];
      const updatedCartItems = storedCartItem.filter(
        (item) => item._id !== itemId
      );

      // Update state
      setLocalQuantities((prevQuantities) => {
        const { [itemId]: _, ...rest } = prevQuantities;
        return rest;
      });
      setCartItems(updatedCartItems);

      // Update localStorage
      if (updatedCartItems.length === 0) {
        localStorage.removeItem('cartItems');
      } else {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };
  const checkoutHandler = () => {
    const cartItemsTotal = cartItems.reduce((acc, item) => {
      const quantity = item.quantity || 1; // Use item.quantity directly
      const price = Number(item.price);
      const subtotal = quantity * price;
      console.log(`Item: ${item._id}, Subtotal: ${subtotal}`);
      return acc + subtotal;
    }, 0);

    if (cartItemsTotal > 0) {
      localStorage.setItem('cartItemsTotal', JSON.stringify(cartItemsTotal));
      navigate('/shippingInfo');
    } else {
      toast.error('Cannot proceed to checkout with an empty cart.');
    }
  };

  useEffect(() => {
    if (storedCartItems.length > 0) {
      handleDelete();
    }
  }, [storedCartItems.length]);
  if (!cartItems) {
    return (
      <div className="row justify-content-center">
        <div className="col-12 mt-5 text-center">
          <h2>Your cart is empty.</h2>

          {/* <Link to="/userOrderList">Go to Orders</Link> */}
        </div>
      </div>
    ); // You can customize this based on your use case
  }
  return (
    <div className="col-5 pt-4">
      <div className="row">
        <Card className="mb-4">
          <Card.Body>
            <div className="delivery-info">
              <b>Restaurant:</b> {branch} {''} {address}
            </div>
            <div className="delivery-info">
              <b>Date:</b> {date}
            </div>
            <div className="delivery-info">
              <b>Time:</b> {time}
            </div>
          </Card.Body>
        </Card>
        <hr />
        <div className="row d-flex justify-content-between">
          <div>
            <h3>Cart Order Items</h3>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Fragment key={item._id}>
                  <hr />
                  <div className="row cart-item">
                    <div className="col-4">
                      <img
                        className="cartImage col-3"
                        src={
                          item.images[0] === undefined
                            ? 'https://via.placeholder.com/20'
                            : item.images[0].image
                        }
                        alt={item.name}
                      />
                      <span
                        className="pointer"
                        onClick={() => handleViewDetails(item)}
                      >
                        {item.name}
                      </span>
                    </div>
                    <div className="col-3">
                      <p id="card_item_price">${item.price}</p>
                    </div>
                    <div className="col-4 mt-4 mt-lg-0">
                      <div
                        className="stockCounter dinline"
                        style={{ margin: '6%' }}
                      >
                        <span>Qty:</span> {item.quantity}
                        <span
                          className="icon-container"
                          onClick={() => handleAdd(item)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </span>
                        <span
                          className="icon-container"
                          onClick={() => handleMinus(item)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </span>
                        <span
                          className="icon-container"
                          onClick={() => handleDelete(item._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </div>
                    </div>
                    <div className="col-6 mt-4 mt-lg-0" />
                  </div>
                </Fragment>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
            <hr />
          </div>
          <div className="col-12">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Items total:{' '}
                <span className="order-summary-values">
                  $
                  {(
                    cartItems.reduce((acc, item) => {
                      const subtotal = item.price * item.quantity;
                      return acc + subtotal;
                    }, 0) || 0
                  ).toFixed(2)}
                </span>
              </p>
              <hr />
              <button
                id="checkout_btn"
                onClick={checkoutHandler}
                className="btn btn-primary btn-block"
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Menu Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMenuItem && (
            <>
              <h3>{selectedMenuItem.name}</h3>
              <p>Price: ${selectedMenuItem.price.toFixed(2)}</p>
              <p>Description: {selectedMenuItem.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;

// /* eslint-disable react/sort-comp */
// /* eslint-disable no-underscore-dangle */

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

// class Cart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cartItems: []
//     };
//   }

//   handleUpdateQuantity = async (itemId, itemQuantity) => {
//     try {
//       const { cartItems } = this.state;
//       const id = cartItems[0]._id;

//       const response = await axios.put(`/api/item/edit/${id}`, {
//         itemId,
//         itemQuantity: Number(itemQuantity)
//       });

//       const updatedCartItems = cartItems.map((cartItem) =>
//         cartItem._id === response.data.data._id ? response.data.data : cartItem
//       );

//       this.setState({
//         cartItems: updatedCartItems
//       });

//       // Fetch updated cart items after updating the state
//       this.fetchCartItems();
//     } catch (error) {
//       console.error('Error updating quantity:', error.message);
//     }
//   };

//   handleDeleteItem = async (itemId) => {
//     try {
//       const { cartItems } = this.state;

//       await axios.delete(`/api/item/delete/${itemId}`);

//       this.setState({
//         cartItems: cartItems.filter((cartItem) => cartItem._id !== itemId)
//       });
//     } catch (error) {
//       console.error('Error deleting item:', error.message);
//     }
//   };

//   fetchCartItems = async () => {
//     try {
//       const userId = JSON.parse(localStorage.getItem('user'))._id;
//       const response = await axios.get(`/api/items/${userId}`);
//       this.setState({ cartItems: response.data.cartItems });
//     } catch (error) {
//       console.error('Error fetching cart items:', error.message);
//     }
//   };

//   componentDidMount() {
//     this.fetchCartItems();
//   }

//   render() {
//     const { cartItems } = this.state;

//     return (
//       <div className="container container-fluid">
//         <h2 className="mt-5">
//           Your Cart:{' '}
//           <b>
//             {cartItems.reduce(
//               (total, cartItem) => total + cartItem.items.length,
//               0
//             )}{' '}
//             items
//           </b>
//         </h2>

//         <div className="row d-flex justify-content-between">
//           <div className="col-12 col-lg-8">
//             <hr />
//             {cartItems.map((cartItem) => (
//               <div key={cartItem._id} className="cart-item">
//                 {cartItem.items.map((item) => (
//                   <div key={item._id} className="row">
//                     <div className="col-4 col-lg-3">
//                       <img
//                         src="./images/products/1.jpg"
//                         alt={item.item.name}
//                         height="90"
//                         width="115"
//                       />
//                     </div>

//                     <div className="col-5 col-lg-3">
//                       <Link to="/">{item.item.name}</Link>
//                     </div>

//                     <div className="col-4 col-lg-2 mt-4 mt-lg-0">
//                       <p id="card_item_price">$ {item.price}</p>
//                     </div>

//                     <div className="col-4 col-lg-2 mt-4 mt-lg-0">
//                       <p id="card_item_price">Quantity- {item.itemQuantity}</p>
//                     </div>

//                     <div className="col-4 col-lg-3 mt-4 mt-lg-0">
//                       <div className="stockCounter d-inline">
//                         <Button
//                           className="btn btn-danger minus"
//                           onClick={() =>
//                             this.handleUpdateQuantity(
//                               item.item._id,
//                               item.itemQuantity - 1
//                             )
//                           }
//                         >
//                           -
//                         </Button>
//                         <input
//                           type="number"
//                           className="form-control count d-inline"
//                           value={item.itemQuantity}
//                           readOnly
//                         />
//                         <Button
//                           className="btn btn-primary plus"
//                           onClick={() =>
//                             this.handleUpdateQuantity(
//                               item.item._id,
//                               item.itemQuantity + 1
//                             )
//                           }
//                         >
//                           +
//                         </Button>
//                       </div>
//                     </div>

//                     <div className="col-4 col-lg-1 mt-4 mt-lg-0">
//                       <Button
//                         variant="danger"
//                         onClick={() => this.handleDeleteItem(item.item._id)}
//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//             <hr />
//           </div>

//           <div className="col-12 col-lg-3 my-4">
//             <div id="order_summary">
//               <h4>Order Summary</h4>
//               <hr />
//               {cartItems.map((cartItem) => (
//                 <React.Fragment key={cartItem._id}>
//                   <p>
//                     Subtotal:{' '}
//                     <span className="order-summary-values">
//                       {cartItem.items.length} (Units)
//                     </span>
//                   </p>
//                   <p>
//                     Est. total: ${' '}
//                     {cartItems
//                       .reduce((total) => {
//                         return (
//                           total +
//                           cartItem.items.reduce((itemTotal, item) => {
//                             return itemTotal + item.price * item.itemQuantity;
//                           }, 0)
//                         );
//                       }, 0)
//                       .toFixed(2)}
//                   </p>
//                 </React.Fragment>
//               ))}

//               <hr />

//               <Link to="/shippingInfo">
//                 <Button id="checkout_btn" className="btn btn-primary btn-block">
//                   Check out
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Cart;
