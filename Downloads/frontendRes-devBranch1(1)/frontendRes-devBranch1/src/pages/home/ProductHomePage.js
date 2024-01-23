/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import React from 'react'; // , { useState, useEffect }
import './ProductPage.css';
import Menus from 'pages/menu/menus';
import { Card, ListGroup } from 'react-bootstrap';
import CartModel from 'pages/order/CartModel';

function ProductPage() {
  const branch = localStorage.getItem('zipCode');
  const date = localStorage.getItem('selectedDate');
  return (
    <div className="product-page">
      <aside className="sidebar">
        <Card>
          <Card.Body>
            <Card.Title>
              <h2>Categories</h2>
            </Card.Title>
            <ListGroup>
              <ListGroup.Item>ALL PRODUCTS</ListGroup.Item>
              {/* Add more categories as needed */}
            </ListGroup>
          </Card.Body>
        </Card>
      </aside>
      <main className="main-content">
        <Menus />
      </main>
      <aside className="cart-summary">
        <Card>
          <Card.Header>
            <h2>Delivery Information</h2>
          </Card.Header>
          <Card.Body>
            <div className="delivery-info">
              <b>Branch:</b> {branch}
            </div>
            <div className="delivery-info">
              <b>Date:</b> {date}
            </div>
          </Card.Body>
        </Card>
        <div className="cart-items">
          <CartModel />
        </div>
      </aside>
    </div>
  );
}

export default ProductPage;
