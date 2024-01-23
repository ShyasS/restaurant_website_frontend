/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
// /* eslint-disable react/destructuring-assignment */
// /* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable no-underscore-dangle */
// import React, { Component } from 'react';
// import { Button, Card, Col, Row } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { faMinus, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

// class CartModel extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cartItems: []
//     };
//   }

//   componentDidMount(id) {
//     this.fetchCartItems(id);
//   }

//   fetchCartItems = async () => {
//     const { cartId } = useParams();
//     try {
//       const response = await axios.get(`/api/item/${cartId}`);
//       this.setState({ cartItems: response.data.cartItems });
//     } catch (error) {
//       console.error('Error fetching cart items:', error.message);
//     }
//   };

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

//       await axios.delete(`/api/item/delete/${itemId}`, { data: { itemId } });

//       this.setState({
//         cartItems: cartItems.filter((cartItem) => cartItem._id !== itemId)
//       });
//       this.fetchCartItems();
//     } catch (error) {
//       console.error('Error deleting item:', error.message);
//     }
//   };

//   handleCheckout = () => {
//     //
//   };

//   render() {
//     const { cartItems } = this.state;
//     const totalAmount = cartItems.reduce(
//       (total, cartItem) =>
//         total +
//         cartItem.items.reduce(
//           (itemTotal, item) => itemTotal + item.price * item.itemQuantity,
//           0
//         ),
//       0
//     );

//     return (
//       <div className="container container-fluid">
//         <h2>
//           Your Cart:{' '}
//           <b>
//             {cartItems.reduce(
//               (total, cartItem) => total + cartItem.items.length,
//               0
//             )}{' '}
//             items
//           </b>
//         </h2>

//         <div className="row">
//           {cartItems.map((cartItem) => (
//             <Card>
//               {cartItem.items.map((item) => (
//                 <>
//                   <Row key={item.item._id}>
//                     <Col>
//                       <Card.Body>
//                         <Row>
//                           <img
//                             className="cartImage"
//                             src={
//                               item.image || 'https://via.placeholder.com/150'
//                             }
//                           />
//                         </Row>
//                         <Row className="d-flex align-items-center">
//                           <div className="d-flex">
//                             <div
//                               className="icon-container mr-3"
//                               onClick={() =>
//                                 this.handleUpdateQuantity(
//                                   item.item._id,
//                                   item.itemQuantity - 1
//                                 )
//                               }
//                             >
//                               <FontAwesomeIcon icon={faMinus} />
//                             </div>
//                             <div
//                               className="icon-container"
//                               onClick={() =>
//                                 this.handleUpdateQuantity(
//                                   item.item._id,
//                                   item.itemQuantity + 1
//                                 )
//                               }
//                             >
//                               <FontAwesomeIcon icon={faPlus} />
//                             </div>
//                           </div>
//                         </Row>
//                       </Card.Body>
//                     </Col>
//                     <Col>
//                       <Card.Body>
//                         <h6>
//                           <Link to="/">{item.item.name}</Link>
//                         </h6>
//                         <Card.Text>
//                           <b>$</b> {item.price.toFixed(2)}
//                         </Card.Text>
//                         <Card.Text>
//                           <b>Qty:</b> {item.itemQuantity}
//                         </Card.Text>
//                       </Card.Body>
//                     </Col>
//                     <Col>
//                       <div
//                         className="mr-3"
//                         style={{ marginTop: '10px' }}
//                         onClick={() => this.handleDeleteItem(item.item._id)}
//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                       </div>
//                     </Col>
//                   </Row>
//                   <hr />
//                 </>
//               ))}
//               <hr />
//             </Card>
//           ))}
//         </div>
//         <Card className="mt-4">
//           <Card.Body>
//             <Card.Text>Total: ${totalAmount}</Card.Text>
//             <Link to="/shippingInfo">
//               <Button
//                 onClick={this.handleCheckout}
//                 className="checkout"
//                 style={{ backgroundColor: '#ffa500' }}
//               >
//                 Continue to checkout
//               </Button>
//             </Link>
//           </Card.Body>
//         </Card>
//       </div>
//     );
//   }
// }

// export default CartModel;

// import React, { useEffect, useState } from 'react';
// import { Button, Card, Col, Row } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { faMinus, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

// const CartModel = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartId, setCartId] = useState(null);

//   const fetchCartItems = async () => {
//     try {
//       if (!cartId) {
//         console.error('cartId is undefined');
//         return;
//       }
//       const response = await axios.get(`/api/item/${cartId}`);
//       setCartItems(response.data.cartItems);
//     } catch (error) {
//       console.error('Error fetching cart items:', error.message);
//     }
//   };

//   const handleUpdateQuantity = async (itemId, itemQuantity) => {
//     try {
//       const id = cartItems[0]._id;

//       const response = await axios.put(`/api/item/edit/${id}`, {
//         itemId,
//         itemQuantity: Number(itemQuantity)
//       });

//       const updatedCartItems = cartItems.map((cartItem) =>
//         cartItem._id === response.data.data._id ? response.data.data : cartItem
//       );

//       setCartItems(updatedCartItems);

//       // Fetch updated cart items after updating the state
//       fetchCartItems();
//     } catch (error) {
//       console.error('Error updating quantity:', error.message);
//     }
//   };

//   const handleDeleteItem = async (itemId) => {
//     try {
//       await axios.delete(`/api/item/delete/${itemId}`, { data: { itemId } });

//       setCartItems((prevCartItems) =>
//         prevCartItems.filter((cartItem) => cartItem._id !== itemId)
//       );

//       // Fetch updated cart items after deleting the item
//       fetchCartItems();
//     } catch (error) {
//       console.error('Error deleting item:', error.message);
//     }
//   };

//   const handleCheckout = () => {
//     // Implement your checkout logic here
//   };
//   useEffect(() => {
//     // Fetch cart ID when the component mounts
//     const fetchCartId = async () => {
//       try {
//         const response = await axios.post('/api/cart/create');
//         setCartId(response.data.cartId);
//       } catch (error) {
//         console.error('Error creating cart:', error.message);
//       }
//     };

//     fetchCartId();
//   }, []);
//   useEffect(() => {
//     if (cartId) {
//       fetchCartItems();
//     }
//   }, [cartId]);

//   const totalAmount = cartItems.reduce(
//     (total, cartItem) =>
//       total +
//       cartItem.items.reduce(
//         (itemTotal, item) => itemTotal + item.price * item.itemQuantity,
//         0
//       ),
//     0
//   );

//   return (
//     <div className="container container-fluid">
//       <h2>
//         Your Cart:{' '}
//         <b>
//           {cartItems.reduce(
//             (total, cartItem) => total + cartItem.items.length,
//             0
//           )}{' '}
//           items
//         </b>
//       </h2>

//       <div className="row">
//         {cartItems.map((cartItem) => (
//           <Card key={cartItem._id}>
//             {cartItem.items.map((item) => (
//               <React.Fragment key={item.item._id}>
//                 <Row>
//                   <Col>
//                     <Card.Body>
//                       <Row>
//                         <img
//                           className="cartImage"
//                           src={item.image || 'https://via.placeholder.com/150'}
//                         />
//                       </Row>
//                       <Row className="d-flex align-items-center">
//                         <div className="d-flex">
//                           <div
//                             className="icon-container mr-3"
//                             onClick={() =>
//                               handleUpdateQuantity(
//                                 item.item._id,
//                                 item.itemQuantity - 1
//                               )
//                             }
//                           >
//                             <FontAwesomeIcon icon={faMinus} />
//                           </div>
//                           <div
//                             className="icon-container"
//                             onClick={() =>
//                               handleUpdateQuantity(
//                                 item.item._id,
//                                 item.itemQuantity + 1
//                               )
//                             }
//                           >
//                             <FontAwesomeIcon icon={faPlus} />
//                           </div>
//                         </div>
//                       </Row>
//                     </Card.Body>
//                   </Col>
//                   <Col>
//                     <Card.Body>
//                       <h6>
//                         <Link to="/">{item.item.name}</Link>
//                       </h6>
//                       <Card.Text>
//                         <b>$</b> {item.price.toFixed(2)}
//                       </Card.Text>
//                       <Card.Text>
//                         <b>Qty:</b> {item.itemQuantity}
//                       </Card.Text>
//                     </Card.Body>
//                   </Col>
//                   <Col>
//                     <div
//                       className="mr-3"
//                       style={{ marginTop: '10px' }}
//                       onClick={() => handleDeleteItem(item.item._id)}
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </div>
//                   </Col>
//                 </Row>
//                 <hr />
//               </React.Fragment>
//             ))}
//             <hr />
//           </Card>
//         ))}
//       </div>
//       <Card className="mt-4">
//         <Card.Body>
//           <Card.Text>Total: ${totalAmount}</Card.Text>
//           <Link to="/shippingInfo">
//             <Button
//               onClick={handleCheckout}
//               className="checkout"
//               style={{ backgroundColor: '#ffa500' }}
//             >
//               Continue to checkout
//             </Button>
//           </Link>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default CartModel;

import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faMinus, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const CartModel = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = () => {
    try {
      const storedCartItems =
        JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedCartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };

  const handleUpdateQuantity = (itemId, itemQuantity) => {
    try {
      const updatedCartItems = cartItems.map((cartItem) => {
        return {
          ...cartItem,
          items: cartItem.items.map((item) => {
            if (item.item._id === itemId) {
              return {
                ...item,
                itemQuantity: Number(itemQuantity)
              };
            }
            return item;
          })
        };
      });

      setCartItems(updatedCartItems);

      // Update session storage with the updated cart items
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  const handleDeleteItem = (itemId) => {
    try {
      const updatedCartItems = cartItems.map((cartItem) => ({
        ...cartItem,
        items: cartItem.items.filter((item) => item.item._id !== itemId)
      }));

      setCartItems(updatedCartItems);

      // Update session storage with the updated cart items
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
  };

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCartItems();
  }, []);

  const totalAmount = cartItems.reduce((total, cartItem) => {
    const itemTotalAmount =
      cartItem.items &&
      Array.isArray(cartItem.items) &&
      cartItem.items.length > 0 &&
      cartItem.items.reduce((itemTotal, item) => {
        return itemTotal + item.price * item.itemQuantity;
      }, 0);

    return total + (itemTotalAmount || 0);
  }, 0);

  return (
    <div className="container container-fluid">
      <h2>
        Your Cart:{' '}
        <b>
          {cartItems.reduce((total, cartItem) => {
            return total + (cartItem.items ? cartItem.items.length : 0);
          }, 0)}{' '}
          items
        </b>
      </h2>

      <div className="row">
        {Array.isArray(cartItems) &&
          cartItems.map((cartItem) => (
            <Card key={cartItem._id}>
              {cartItem.items &&
                Array.isArray(cartItem.items) &&
                cartItem.items.map((item) => (
                  <React.Fragment key={item.item._id}>
                    <Row>
                      <Col>
                        <Card.Body>
                          <Row>
                            <img
                              className="cartImage"
                              src={
                                item.image || 'https://via.placeholder.com/150'
                              }
                            />
                          </Row>
                          <Row className="d-flex align-items-center">
                            <div className="d-flex">
                              <div
                                className="icon-container mr-3"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.item._id,
                                    item.itemQuantity - 1
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </div>
                              <div
                                className="icon-container"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.item._id,
                                    item.itemQuantity + 1
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </div>
                            </div>
                          </Row>
                        </Card.Body>
                      </Col>
                      <Col>
                        <Card.Body>
                          <h6>
                            <Link to="/">{item.item.name}</Link>
                          </h6>
                          <Card.Text>
                            <b>$</b> {item.price.toFixed(2)}
                          </Card.Text>
                          <Card.Text>
                            <b>Qty:</b> {item.itemQuantity}
                          </Card.Text>
                        </Card.Body>
                      </Col>
                      <Col>
                        <div
                          className="mr-3"
                          style={{ marginTop: '10px' }}
                          onClick={() => handleDeleteItem(item.item._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </Col>
                    </Row>
                    <hr />
                  </React.Fragment>
                ))}
              <hr />
            </Card>
          ))}
      </div>
      <Card className="mt-4">
        <Card.Body>
          <Card.Text>Total: ${totalAmount}</Card.Text>
          <Link to="/shippingInfo">
            <Button
              onClick={handleCheckout}
              className="checkout"
              style={{ backgroundColor: '#ffa500' }}
            >
              Continue to checkout
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartModel;
