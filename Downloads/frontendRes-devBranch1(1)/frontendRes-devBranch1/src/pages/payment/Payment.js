/* eslint-disable react/prop-types */

import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import axios from 'axios';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorBoundary from './ErrorBoundary';

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const confirmOrderData = JSON.parse(localStorage.getItem('confirmOrder'));
  const emailOrMobile = JSON.parse(localStorage.getItem('emailOrMobile'));
  // const user = JSON.parse(localStorage.getItem('user'));
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
  const billingAddress = JSON.parse(localStorage.getItem('billingAddress'));

  const paymentData = {
    amount: Math.round(confirmOrderData.orderSummary.total),
    shipping: {
      name: `${shippingInfo.name} ${shippingInfo.lastName}`,
      phone: shippingInfo.mobileNumber || emailOrMobile,
      address: {
        line1: billingAddress?.streetAddress,
        line2: null,
        city: billingAddress?.city,
        state: billingAddress?.state,
        postal_code: billingAddress?.postalCode,
        country: billingAddress?.country
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true;

    try {
      const { data } = await axios.post('/api/payment/process', paymentData);
      const clientSecret = data.client_secret;
      const cardNumberElement = elements.getElement(CardNumberElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: `${shippingInfo.name} ${shippingInfo.lastName}`,
            email: shippingInfo.email
          }
        }
      });

      if (result.error) {
        toast(result.error.message, {
          type: 'error',
          position: toast.POSITION.BOTTOM_CENTER
        });
        document.querySelector('#pay_btn').disabled = false;
      } else if (result.paymentIntent.status === 'succeeded') {
        // Payment Success!
        toast('Payment Success!', {
          type: 'success',
          position: toast.POSITION.BOTTOM_CENTER
        });
        localStorage.setItem('payment', JSON.stringify(result));
        navigate('/order/success');

        // Optionally, you can perform other actions here after successful payment
      } else {
        // Payment failed
        toast('Payment failed, Please try again!', {
          type: 'warning',
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    } catch (error) {
      // Handle any API call errors
      console.error('Error processing payment:', error.message);
    }
  };

  return (
    <ErrorBoundary>
      <div className="row wrapper col-12">
        <div className="container my-4">
          <div className="col-8 mx-auto mt-5">
            <Form onSubmit={submitHandler} className="shadow-lg custom-table">
              <div className="m-3">
                <h4 className="mb-4">Card Info</h4>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    value=""
                  />
                </div>

                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block my-3"
                >
                  Pay -{' '}
                  {` $${
                    confirmOrderData.orderSummary &&
                    confirmOrderData.orderSummary.total
                  }`}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Payment;
