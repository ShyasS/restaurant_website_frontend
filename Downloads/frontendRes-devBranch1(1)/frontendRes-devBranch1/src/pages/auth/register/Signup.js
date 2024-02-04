/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUpForm.css';

const SignUpForm = () => {
  // const navigate = useNavigate();
  const defaultAvatarImage =
    'https://th.bing.com/th/id/OIP.QTPhxyhDQjv4eE1mA4ulLAHaJs?w=168&h=220&c=7&r=0&o=5&dpr=1.3&pid=1.7';
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: defaultAvatarImage,
    // confirmEmail: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the axios call to your login API endpoint
      const response = await axios.post('/api/register', formData);

      // Handle success, for example, show a success message or redirect
      // console.log('Register successful', response.data);

      // Show success toast
      toast.success('Registration link has sent to your email successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      // navigate('/');
    } catch (error) {
      // Handle error
      // console.error('error', error.response.data.message);

      // Show error toast
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };
  const defaultAvatarStyle = {
    display: formData.avatar === defaultAvatarImage ? 'block' : 'none',
    maxWidth: '100px' // Adjust the size as needed
  };

  const customAvatarStyle = {
    display: formData.avatar !== defaultAvatarImage ? 'block' : 'none',
    maxWidth: '100px' // Adjust the size as needed
    // Add additional styles for custom avatar if needed
  };
  const avatarContainerStyle = {
    textAlign: 'center'
  };

  return (
    <div className="container signup-form-container">
      <form onSubmit={handleSubmit}>
        <div className="col-11 col-md-6 mx-auto custom-table mt-4">
          <div className="col-md-12 col-12 px-4">
            <h3 className="text-center mt-3 font-regular-29">Sign up</h3>
            <div>
              If you have account?{' '}
              <div className="links-container mb-4">
                <div>
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
            <div className="col-md-11 mx-auto">
              <div className="mb-3 address-container">
                <label htmlFor="name">
                  First name:
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Field is required"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control `}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-11 mx-auto">
              <div className="mb-3 address-container">
                <label htmlFor="lastName">
                  Last name:
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Field is required"
                    value={formData.lastName}
                    className={`form-control `}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-11 mx-auto">
              <div className="mb-3 address-container">
                <label htmlFor="email1">
                  Email:{' '}
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <div>
                  <input
                    type="email"
                    id="email1"
                    name="email"
                    placeholder="Field is required"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control `}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-11 mx-auto">
              <div className="mb-3 address-container">
                <label htmlFor="password">
                  Password:{' '}
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                    <span>
                      <p>At least 8 characters</p>
                    </span>
                  </span>
                </label>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Field is required"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`form-control `}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-11 mx-auto">
              <div className="mb-3 address-container">
                <label htmlFor="phone">
                  Phone:{' '}
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Field is required"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`form-control `}
                  />
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', display: 'none' }}>
              <label htmlFor="avatar">Avatar Image:</label>
              <div style={avatarContainerStyle}>
                <img
                  src={formData.avatar}
                  alt="User Avatar"
                  style={{ ...defaultAvatarStyle, marginBottom: '10px' }}
                />
                <img
                  src={formData.avatar}
                  alt="User Avatar"
                  style={customAvatarStyle}
                />
              </div>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.files[0] })
                }
                style={{ width: '100%' }}
              />
            </div>

            <div className="my-3">
              <button type="submit">Sign up</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
