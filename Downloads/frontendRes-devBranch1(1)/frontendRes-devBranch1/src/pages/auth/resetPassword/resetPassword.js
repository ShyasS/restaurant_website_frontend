import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import {
  resetPassword,
  clearAuthError
} from '../../../redux-toolkit/actions/auth';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.authState
  );
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      toast('Password Reset Success!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => {
          dispatch(clearAuthError);
        }
      });
    }

    if (validator.current.allValid()) {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);

      dispatch(resetPassword(formData, token));
      navigate('/login');
    } else {
      // If validation fails, show validation messages
      validator.current.showMessages();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast('Password Reset Success!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => {
          dispatch(clearAuthError);
        }
      });
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center mt-3 font-regular-29">Reset password</h3>
          <div className="mb-3">
            <label className="form-label" htmlFor="password_field">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirm_password_field">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {validator.current.message('password', password, 'required')}
            {validator.current.message(
              'confirmPassword',
              confirmPassword,
              'required|same:password'
            )}
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn btn-secondary">
          Submit
        </button>
      </div>
    </form>
  );
};
export default ResetPassword;
