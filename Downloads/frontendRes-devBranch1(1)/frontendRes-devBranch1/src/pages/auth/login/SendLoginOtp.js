import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import {
  clearAuthError,
  sendLoginOtp
} from '../../../redux-toolkit/actions/auth';
import './login.scss';

const SendLoginOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
      // console.log('Logged in successfully');
    }
    if (error) {
      // console.log(error);
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => {
          dispatch(clearAuthError);
        }
      });
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      localStorage.setItem('emailOrPhone', JSON.stringify(email));
      toast(`OTP sent!`, {
        type: 'success',
        position: toast.POSITION.BOTTOM_FULL_WIDTH
      });
      navigate('/loginWithOtp');
      dispatch(sendLoginOtp(email));
    } else {
      validator.current.showMessages();
      setEmail('');
      dispatch(sendLoginOtp(setEmail));
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="row custom-table my-5">
        <div className="col-11 mx-auto">
          <h3 className="text-center mt-3 font-regular-29">Send OTP</h3>
          <div className="mb-3">
            <label className="form-label">
              Email
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
            {validator.current.message('email', email, 'required')}
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-secondary m-3"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
export default SendLoginOtp;
