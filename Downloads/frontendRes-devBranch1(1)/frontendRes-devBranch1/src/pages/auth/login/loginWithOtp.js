import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import './login.scss';

const LoginWithOtp = () => {
  const emailOrPhone = JSON.parse(localStorage.getItem('emailOrPhone'));
  const navigate = useNavigate();
  const [email, setEmail] = useState(emailOrPhone);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      try {
        setLoading(true);
        const response = await axios.post('/api/login', { email, otp });
        const { token, user } = response.data;
        document.cookie = `token=${token}; path=/;`;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isloggedIn', 'true');
        // localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        setLoading(false);

        // Redirect logic based on user role
        if (user && user.role !== 'user') {
          navigate('/admin/dashboard');
          localStorage.removeItem('emailOrPhone');
        } else {
          navigate('/');
        }
      } catch (error) {
        // console.error('Login failed:', error.message);
        toast.error('Login failed. Please try again.', {
          position: toast.POSITION.BOTTOM_CENTER
        });
        setLoading(false);
      }
    } else {
      validator.current.showMessages();
    }
  };

  return (
    <div className="signup-form-container mx-auto container-fluid col-md-5 my-5">
      <form onSubmit={handleLogin}>
        <div className="row mx-3 custom-table">
          <div className="col-11 mx-auto">
            <h3 className="text-center mt-3 font-regular-29">Log in</h3>
            <div>
              Do not have an account?
              <Link to="/signup">Sign Up</Link>
            </div>
            <div className="mb-3" style={{ display: 'none' }}>
              <label htmlFor="email" className="form-label">
                Email address{' '}
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <input
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Field is required"
                className="form-control"
              />
              {validator.current.message('Email', email, 'required')}
            </div>
          </div>
          <div className="col-11 mx-auto">
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                OTP{' '}
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <input
                value={otp}
                name="otp"
                onChange={(e) => setOtp(e.target.value)}
                type="otp"
                required
                placeholder="Field is required"
                className="form-control"
              />
              {validator.current.message('otp', otp, 'required')}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn my-global-button my-3"
            >
              {loading ? 'Logging in...' : 'Submit'}
            </button>
          </div>
          <div>
            <Link to="/login">Back to login</Link>
          </div>
          <div className="mb-3">
            <Link to="/">Continue as Guest</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginWithOtp;
