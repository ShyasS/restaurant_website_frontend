import React from 'react'
import { useRef, useState,useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import '../pages/home/draft//home1.css';
// Import Swiper styles
import 'swiper/css';
import '../ExamplePage/HomePage.css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../pages/home/draft/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { Col, NavDropdown } from 'react-bootstrap';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { EffectCube } from 'swiper/modules';


import { useDispatch, useSelector } from 'react-redux';
const HomePage = () => {
    const { isAuthenticated } = useSelector((state) => state.authState);
  const pathname1 = window.location.pathname;
  console.log(pathname1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isloggedIn = localStorage.getItem('isloggedIn' || false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nav, setNav] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

  const handleLogout = () => {
    dispatch(logout);
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.clear();
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
  const [items, setItems] = useState(0);

  useEffect(() => {
    const handleStorage = () => {
      const items = JSON.parse(sessionStorage.getItem('cartItems'));
      console.log(items);
      if (items) {
        setItems(items.length);
        console.log(items);
      }
    };

    window.addEventListener('storage', handleStorage());
    return () => window.removeEventListener('storage', handleStorage());
  }, []);
  return(
    <div className='HomeSlider'>
           {/* <Container >
                  <Navbar.Toggle aria-controls=" responsive-navbar-nav" />
                   <Navbar.Collapse id=" justify-content-end responsive-navbar-nav">
                 <Nav style={{marginLeft:'200px'}}  >
                                <Nav.Link as={Link}  to={'/'} className='navlink' id="Navlink" href="#home"><span>Home</span></Nav.Link>
                                <Nav.Link as={Link} to={'/select'} className='navlink' id="Navlink" ><span>Order</span></Nav.Link>
                  
                            </Nav>  
                            <Col md={10} xs={8} >     
                            {isLoggedIn ? (
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  )}
                  </Col>
                            </Navbar.Collapse>
                            </Container> */}



       
<Swiper
        effect={'cube'}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Autoplay,EffectCube]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={require('../assets/img/ESliderImg1.jpg')}/>
        </SwiperSlide>
        <SwiperSlide>
          <img  src={require('../assets/img/ESliderImg2.jpg')} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('../assets/img/ESliderImg3.jpg')}/>
        </SwiperSlide>
        <SwiperSlide>
          <img  src={require('../assets/img/ESliderImg1.jpg')}/>
        </SwiperSlide>
        <SwiperSlide>
          <img  src={require('../assets/img/ESliderImg2.jpg')} />
        </SwiperSlide>
        <SwiperSlide>
          <img  src={require('../assets/img/ESliderImg3.jpg')}/>
        </SwiperSlide>
        <SwiperSlide>
          <img  src={require('../assets/img/ESliderImg1.jpg')}/>
        </SwiperSlide>
        <SwiperSlide>
          <img  src={require('../assets/img/ESliderImg2.jpg')} />
        </SwiperSlide>
        <SwiperSlide>
          <img  src={require('../assets/img/ESliderImg3.jpg')}/>
        </SwiperSlide>
      </Swiper>





    </div>
  )
}

export default HomePage