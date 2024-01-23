import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import {
  forgotPassword,
  clearAuthError
} from '../../../redux-toolkit/actions/auth.js';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { message, error, loading } = useSelector((state) => state.authState);
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (message) {
      toast(message, {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });
      setEmail('');
    }

    if (error) {
      toast(JSON.stringify(error), {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => {
          dispatch(clearAuthError());
        }
      });
    }
  }, [message, error, dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="row custom-table my-5">
            <div className="col-md-12">
              <h3 className="text-center mt-3 font-regular-29">
                Forgot password
              </h3>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address Email address{' '}
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
            <button
              type="submit"
              disabled={loading}
              className="btn btn-secondary"
            >
              Submit
            </button>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-secondary mb-4"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ForgotPasswordPage;
