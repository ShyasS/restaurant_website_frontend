/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { clearAuthError, loginOtp } from '../../../redux-toolkit/actions/auth';
import './login.scss';

const LoginWithOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the appropriate page, e.g., dashboard
      navigate('/');
    } else if (error) {
      // Display error toast if login fails
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        onClose: () => {
          dispatch(clearAuthError());
        }
      });
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      dispatch(loginOtp(email, otp));
      // navigate('/');
    } else {
      validator.current.showMessages();
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center mt-3 font-regular-29">Log in</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              OTP
            </label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              name="otp"
              type="text" // Change input type to text
              className="form-control"
            />
            {validator.current.message('otp', otp, 'required')}
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn btn-secondary">
          Submit
        </button>
      </div>
    </form>
  );
};
export default LoginWithOtp;
