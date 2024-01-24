/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { React, useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { Form, FormControl, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { logout } from '../redux-toolkit/actions/auth';
import './header.css';
import logo from '../assets/img/grandIndiaLogo1.png';

const Header = () => {
  // const { isAuthenticated } = useSelector((state) => state.authState);
  const pathname1 = window.location.pathname;
  // console.log(pathname1);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const isloggedIn = localStorage.getItem('isloggedIn' || false);
  // const user = JSON.parse(localStorage.getItem('user'));
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [nav, setNav] = useState(false);

  // const changeBackground = () => {
  //   if (window.scrollY >= 50) {
  //     setNav(true);
  //   } else {
  //     setNav(false);
  //   }
  // };

  // window.addEventListener('scroll', changeBackground);

  // const handleLogout = () => {
  //   dispatch(logout);
  //   document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  //   document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('user');
  //   localStorage.clear();
  //   window.localStorage.setItem('isloggedIn', false);
  //   toast.success('Logout successful!', {
  //     position: 'top-right',
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true
  //   });
  //   setIsLoggedIn(false);
  //   navigate('/login');
  // };

  // const getUserRole = () => {
  //   const userString = localStorage.getItem('user');
  //   if (userString) {
  //     const user = JSON.parse(userString);
  //     return user.role;
  //   }
  //   return null;
  // };

  // const role = getUserRole();
  // const [items, setItems] = useState(0);

  // useEffect(() => {
  //   const handleStorage = () => {
  //     const items = JSON.parse(sessionStorage.getItem('cartItems'));
  //     console.log(items);
  //     if (items) {
  //       setItems(items.length);
  //       console.log(items);
  //     }
  //   };

  //   window.addEventListener('storage', handleStorage());
  //   return () => window.removeEventListener('storage', handleStorage());
  // }, []);
  const { isAuthenticated } = useSelector((state) => state.authState);
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const cartItemsFromStorage =
    JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(cartItemsFromStorage);

  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const isloggedIn = localStorage.getItem('isloggedIn' || false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavbarToggle = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  const handleLogout = () => {
    dispatch(logout);
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.clear();
    localStorage.clear();
    window.localStorage.setItem('isloggedIn', false);
    window.localStorage.setItem('isloggedIn', false);
    toast.success('Logout successful!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    setIsLoggedIn(false);
    navigate('/login');
  };

  const getUserRole = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user.role;
    }
    return null;
  };

  const role = getUserRole();
  useEffect(() => {
    setNavbarExpanded(false);
  }, [navigate, token]);
  return (
    <Navbar
      expand="lg"
      className="header-custom custom-navbar"
      id="header"
      expanded={navbarExpanded}
    >
      {pathname1 === '/login' ||
      pathname1 === '/signup' ||
      pathname1 === '/password/forgot' ||
      pathname1 === '/login/otp' ||
      pathname1 === '/loginWithOtp' ||
      pathname1 === `/api/password/reset/:${token}` ? (
        <></>
      ) : (
        <>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Grand India Logo" style={{ width: '60%' }} />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleNavbarToggle}
            style={{ border: '2px solid #8D4527' }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto custom-navbar">
              {isAuthenticated || isloggedIn === 'true' ? (
                <>
                  {/* <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link> */}
                  {role === 'user' && (
                    <>
                      <Nav.Link as={Link} to="/">
                        <i className="fa-solid fa-house menuIconColor" />
                        Home
                      </Nav.Link>
                      <Nav.Link as={Link} to="/select">
                        <i className="fa-solid fa-bell-concierge menuIconColor" />
                        Order
                      </Nav.Link>
                      <Nav.Link as={Link} to={`/myProfile/${user._id}`}>
                        <i className="fa-solid fa-user menuIconColor" />
                        Profile
                      </Nav.Link>
                    </>
                  )}
                  {role === 'admin' && (
                    <>
                      <Nav.Link as={Link} to="/">
                        <i className="fa-solid fa-house menuIconColor" />
                        Home
                      </Nav.Link>
                      <Nav.Link as={Link} to="/select">
                        <i className="fa-solid fa-bell-concierge menuIconColor" />
                        Order
                      </Nav.Link>
                      <Nav.Link as={Link} to={`/myProfile/${user._id}`}>
                        <i className="fa-solid fa-user menuIconColor" />
                        Profile
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/dashboard">
                        <i className="fa-solid fa-table-columns menuIconColor" />
                        Dashboard
                      </Nav.Link>

                      <Nav.Link as={Link} to="/admin/orders">
                        <i className="fa-regular fa-note-sticky menuIconColor" />
                        <span>Active Orders</span>
                      </Nav.Link>
                      {/* <NavDropdown
                          title="Active Orders"
                          id="basic-nav-dropdown"
                        >
                          <NavDropdown.Item as={Link} to="/admin/orders">
                            All
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/admin/orders/pickup">
                            Pick up
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            as={Link}
                            to="/admin/orders/delivery"
                          >
                            Delivery
                          </NavDropdown.Item>
                    </NavDropdown> */}
                      <Nav.Link as={Link} to="/admin/orderHistory">
                        <i className="fa-solid fa-clock-rotate-left menuIconColor" />
                        Order History
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/menus">
                        <i className="fa-solid fa-utensils menuIconColor" />
                        Menus
                      </Nav.Link>
                    </>
                  )}
                  {role === 'superAdmin' && (
                    <>
                      <Nav.Link as={Link} to="/">
                        <i className="fa-solid fa-house menuIconColor" />
                        <span> Home</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/select">
                        <i className="fa-solid fa-bell-concierge menuIconColor" />
                        <span>Order</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/dashboard">
                        <i className="fa-solid fa-table-columns menuIconColor" />
                        <span>Dashboard</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/orders">
                        <i className="fa-regular fa-note-sticky menuIconColor" />
                        <span>Active Orders</span>
                      </Nav.Link>
                      {/* <NavDropdown title="Active Orders" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/admin/orders">
                        All
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/orders/pickup">
                        Pick up
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/orders/delivery">
                        Delivery
                      </NavDropdown.Item>
                </NavDropdown> */}
                      <Nav.Link as={Link} to="/admin/menus">
                        <i className="fa-solid fa-utensils menuIconColor" />
                        <span>Menus</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/orderHistory">
                        <i className="fa-solid fa-clock-rotate-left menuIconColor" />
                        <span>Order History</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/users">
                        <i className="fa-solid fa-user menuIconColor" />
                        <span>Users</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/admin/restaurants">
                        <i className="fa-solid fa-hotel menuIconColor" />
                        <span>Restaurants</span>
                      </Nav.Link>
                      {/* <NavDropdown title="Content" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/admin/carousel/list">
                        Caurousel list
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/carousel/new">
                        Create carousel
                      </NavDropdown.Item>
                </NavDropdown> */}
                    </>
                  )}
                  {!isLoggedIn ? (
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  )}
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">
                    <i className="fa-solid fa-house menuIconColor" />
                    <span>Home</span>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/select">
                    <i className="fa-solid fa-bell-concierge menuIconColor" />
                    <span> Order</span>
                  </Nav.Link>
                  {/* <Nav.Link as={Link} to="/cart">
              <i className="fa-solid fa-cart-shopping" />
              <span className="badge rounded-pill badge-notification bg-danger">
                {items}
              </span>
              <span>Cart</span>
        </Nav.Link> */}
                  {isLoggedIn ? (
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

export default Header;
