// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import SimpleReactValidator from 'simple-react-validator';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { clearAuthError } from '../../../redux-toolkit/actions/auth';

// const Register = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: ''
//   });
//   const { loading, error, isAuthenticated } = useSelector(
//     (state) => state.authState
//   );
//   const validator = useRef(
//     new SimpleReactValidator({
//       className: 'text-danger',
//       validators: {
//         tel: {
//           message: 'The :attribute must be a valid phone number.',
//           rule: (val) => {
//             return /^\d{10}$/.test(val); // Modify the regex based on your phone number format
//           },
//           required: true
//         }
//       }
//     })
//   );

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//       console.log('Registered successfully');
//     }
//     if (error) {
//       toast(error, {
//         position: toast.POSITION.TOP_RIGHT,
//         type: 'error',
//         onOpen: () => {
//           dispatch(clearAuthError);
//         }
//       });
//     }
//   }, [error, isAuthenticated, dispatch, navigate]);

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!validator.current.allValid()) {
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('name', userData.name);
//       formData.append('email', userData.email);
//       formData.append('password', userData.password);
//       formData.append('phone', userData.phone);

//       // Make the axios call
//       const response = await axios.post('/api/register', formData);

//       // Handle success
//       console.log('Registration successful', response.data);
//       navigate('/login'); // Redirect to login page after successful registration
//     } catch (err) {
//       // Handle error
//       console.log(err);
//       if (error && error.response) {
//         toast(error.response.data.message, {
//           position: toast.POSITION.TOP_RIGHT,
//           type: 'error'
//         });
//       } else {
//         // Handle the case where 'error' or 'error.response' is null
//         toast('An error occurred', {
//           position: toast.POSITION.TOP_RIGHT,
//           type: 'error'
//         });
//       }
//     }
//   };
//   const onChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <div className="row">
//         <div className="col-md-12">
//           <h3 className="text-center mt-3 font-regular-29">Register</h3>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Name
//             </label>
//             <input
//               name="name"
//               onChange={onChange}
//               type="text"
//               className="form-control"
//             />
//             {validator.current.message('Name', userData.name, 'required')}
//           </div>
//         </div>
//         <div className="col-md-12">
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email address
//             </label>
//             <input
//               onChange={onChange}
//               name="email"
//               type="email"
//               className="form-control"
//             />
//             {validator.current.message(
//               'Email',
//               userData.email,
//               'required|email'
//             )}
//           </div>
//         </div>
//         <div className="col-md-12">
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               name="password"
//               onChange={onChange}
//               type="password"
//               className="form-control"
//             />
//             {validator.current.message(
//               'Password',
//               userData.password,
//               'required|min:6'
//             )}
//           </div>
//         </div>
//         <div className="col-md-12">
//           <div className="mb-3">
//             <label htmlFor="tel" className="form-label">
//               Phone
//             </label>
//             <input
//               name="phone"
//               onChange={onChange}
//               type="tel"
//               className="form-control"
//             />
//             {validator.current.message('Phone', userData.phone, 'required|tel')}
//           </div>
//         </div>
//         <button type="submit" disabled={loading} className="btn btn-secondary">
//           Register
//         </button>
//       </div>
//       <div className="links-container">
//         <Link to="/login">Login</Link>
//       </div>
//     </form>
//   );
// };
// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    confirmEmail: '',
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
      console.log('Register successful', response.data);
    } catch (error) {
      // Handle error
      console.error('error', error.response.data.message);
      // You can display an error message to the user or handle it as needed
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div>
          If you have an account? <Link to="/login">login</Link>
        </div>
        <div>
          <label htmlFor="name">First name:</label>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="First Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="name">Last name:</label>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <div>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              // eslint-disable-next-line prettier/prettier
        />
          </div>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
