/* eslint-disable react/button-has-type */
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { login } from '../../../redux-toolkit/actions/auth';
import './login.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, isAuthenticated, loginSuccess } = useSelector(
    (state) => state.authState
  );
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );

  const handleLogin = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      dispatch(login(email, password));
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } else {
      validator.current.showMessages();
      setEmail('');
      setPassword('');
      // dispatch(login(setEmail, setPassword));
    }
  };
  useEffect(() => {
    if (loginSuccess) {
      const { token, user } = loginSuccess.payload;
      document.cookie = `token=${token}; path=/;`;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (error) {
      console.log(error);
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
        // onClose: () => {
        //   dispatch(clearAuthError());
        // }
      });
    }
    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role !== 'user') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [error, isAuthenticated, dispatch, navigate, loginSuccess]);

  return (
    <div className="signup-form-container">
      <form onSubmit={handleLogin}>
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center mt-3 font-regular-29">Log in</h3>
            <div>
              Do not have account?
              <Link to="/signup">Sign Up</Link>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
              />
              {validator.current.message('Email', email, 'required')}
            </div>
          </div>
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
              />
              {validator.current.message('password', password, 'required')}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-secondary"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="links-container">
          <div>
            <Link to="/">Continue as Guest</Link>
          </div>

          <div>
            <Link to="/password/forgot">Forgot password?</Link>
          </div>
          <div>
            <Link to="/login/otp">Login with OTP</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
