/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MenuList from './MenuList';
import FilterPanel from './FilterPanel';
import CartSummary from './CartSummaryy';
import './home1.css';

const Home = () => {
  const branch = localStorage.getItem('branch');
  const address = localStorage.getItem('Address');
  const date = localStorage.getItem('selectedDate');
  const selectedBranch = localStorage.getItem('restaurantId');
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(storedCartItems);
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [localQuantities, setLocalQuantities] = useState(
    storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {})
  );
  const [productsCount, setProductsCount] = useState(0);
  const [resPerPage, setResPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealTypeCategory, setMealTypeCategory] = useState(null);
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState(null);
  const [dietaryCategories, setDietaryCategories] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [items, setItems] = useState(0);

  useEffect(() => {
    const handleStorage = () => {
      const items = JSON.parse(localStorage.getItem('cartItems'));
      // console.log(items);
      if (items) {
        setItems(items.length);
        // console.log(items);
      }
    };

    window.addEventListener('storage', handleStorage());
    return () => window.removeEventListener('storage', handleStorage());
  }, []);

  const handleAddToCart = (menuItem) => {
    // Check if menuItem is defined and has an _id property
    if (!menuItem || !menuItem._id) {
      // console.error('Invalid menuItem:', menuItem);
      return;
    }

    // Check if the item is already in the cart
    const existingCartItem = cartItems.find(
      (item) => item._id === menuItem._id
    );

    if (existingCartItem) {
      return;
    }
    const updatedCartItems = [
      ...cartItems,
      { ...menuItem, quantity: cartItems.quantity || 1 }
    ];
    setCartItems(updatedCartItems);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    const items = JSON.parse(localStorage.getItem('cartItems'));
    if (items) {
      setItems(items.length);
    }
  };

  const handleViewDetails = (selectedMenu) => {
    setSelectedMenuItem(selectedMenu);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getProducts = async (
    keyword,
    dietaryPreferenceCategory,
    mealTypeCategory,
    currentPage
  ) => {
    try {
      setLoading(true);
      let link = `http://localhost:8000/api/products?restaurantId=${selectedBranch}&page=${currentPage}`;
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (mealTypeCategory) {
        link += `&mealTypeCategory=${mealTypeCategory}`;
      }
      if (dietaryPreferenceCategory) {
        link += `&dietaryPreferenceCategory=${dietaryPreferenceCategory}`;
      }
      const response = await axios.get(link);
      setMenus(response.data.Menus);
      setProductsCount(response.data.Count);
      setResPerPage(response.data.resPerPage);
      setLoading(false);
    } catch (error) {
      // console.error('Error fetching menus:', error);
      setLoading(false);
      // toast.warning('No menus available!', {
      //   position: toast.POSITION.BOTTOM_CENTER,
      //   autoClose: 3000
      // });
      setMealTypeCategory(null);
      setDietaryPreferenceCategory(null);
    }
  };

  const handleClearFilter = () => {
    setMealTypeCategory(null);
    setDietaryPreferenceCategory(null);
  };

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchTerm('');
  };

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
      // console.error('Error deleting item:', error.message);
      toast.error('Error deleting item');
    }
  };
  const checkoutHandler = () => {
    const cartItemsTotal = cartItems.reduce((acc, item) => {
      const quantity = item.quantity || 1; // Use item.quantity directly
      const price = Number(item.price);
      const subtotal = quantity * price;
      // console.log(`Item: ${item._id}, Subtotal: ${subtotal}`);
      return acc + subtotal;
    }, 0);

    if (cartItemsTotal > 0) {
      localStorage.setItem('cartItemsTotal', JSON.stringify(cartItemsTotal));
      navigate('/shippingInfo');
    } else {
      // toast.error('Cannot proceed to checkout with an empty cart.');
    }
  };

  useEffect(() => {
    if (storedCartItems.length > 0) {
      handleDelete();
    }
  }, [storedCartItems.length]);

  useEffect(() => {
    getProducts(
      searchTerm,
      dietaryPreferenceCategory,
      mealTypeCategory,
      currentPage
    );
  }, [
    currentPage,
    searchTerm,
    mealTypeCategory,
    dietaryPreferenceCategory,
    branch
  ]);

  useEffect(() => {
    axios
      .get('/api/dietary-preferences')
      .then((response) => setDietaryCategories(response.data.data))
      .catch((error) =>
        // console.error('Error fetching dietary categories:', error)
        toast.error('Error fetching dietary categories')
      );

    axios
      .get('/api/meal-types')
      .then((response) => setMealCategories(response.data.data))
      .catch((error) =>
        // console.error('Error fetching meal categories:', error)
        toast.error('Error fetching meal categories')
      );
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          float: 'right',
          margin: '4%',
          marginLeft: '88%'
        }}
        className="ml-auto"
      >
        <Nav.Link as={Link} to="/cart">
          <i className="fa-solid fa-cart-shopping fa-xl" />
          <span className="badge rounded-pill badge-notification bg-danger">
            {items}
          </span>
        </Nav.Link>
      </div>
      <Container fluid style={{ marginTop: '2%' }}>
        <Row>
          <Col xs={4} md={2} lg={2}>
            <FilterPanel
              dietaryCategories={dietaryCategories}
              mealCategories={mealCategories}
              mealTypeCategory={mealTypeCategory}
              setMealTypeCategory={setMealTypeCategory}
              dietaryPreferenceCategory={dietaryPreferenceCategory}
              setDietaryPreferenceCategory={setDietaryPreferenceCategory}
              handleClearFilter={handleClearFilter}
            />
          </Col>
          {menus.length === 0 ? (
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '999',
                padding: '20px',
                textAlign: 'center',
                display: menus.length === 0 ? 'block' : 'none'
              }}
            >
              No menus found
            </div>
          ) : (
            <Col xs={12} md={7} lg={10}>
              <MenuList
                menus={menus}
                handleViewDetails={handleViewDetails}
                handleAddToCart={handleAddToCart}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
                handlePageChange={handlePageChange}
                searchTerm={searchTerm}
                handleCloseModal={handleCloseModal}
                showModal={showModal}
                show={showModal}
                onHide={handleCloseModal}
                selectedMenuItem={selectedMenuItem}
              />
            </Col>
          )}
          {/* <Col xs={2} md={1} lg={1}>
  <CartSummary
    branch={branch}
    address={address}
    date={date}
    cartItems={cartItems}
    handleAdd={handleAdd}
    handleMinus={handleMinus}
    handleDelete={handleDelete}
    handleViewDetails={handleViewDetails}
    checkoutHandler={checkoutHandler}
    handleCloseModal={handleCloseModal}
    showModal={showModal}
    show={showModal}
    onHide={handleCloseModal}
    selectedMenuItem={selectedMenuItem}
  />
   <Modal
show={showModal}
showModal={showModal}
onHide={handleCloseModal}
selectedMenuItem={selectedMenuItem}
/>
</Col> */}
        </Row>
      </Container>
    </>
  );
};

export default Home;
