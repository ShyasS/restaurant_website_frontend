/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// MenuList.js
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './menuList.css';

const MenuList = ({
  menus,
  handleViewDetails,
  handleAddToCart,
  searchTerm,
  handleSearchChange,
  handleSearchSubmit,
  handleCloseModal,
  showModal,
  selectedMenuItem
}) => {
  return (
    <div id="products" className="col-12">
      <div className="row">
        <div className="col-10">
          <input
            type="text"
            className={`form-control `}
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-1">
          {/* <Button onClick={handleSearchSubmit}>clear</Button> */}
        </div>
      </div>

      <div style={{ margin: '2%' }} className="borderUp">
        {menus.map((menuItem) => (
          <div className="row" style={{ margin: '2%' }}>
            {/* <div
              key={menuItem._id}
              className="col-sm-12 col-md-6 col-lg-4 my-3"
            >
              <div className="card p-3 rounded shadow">
                <h7 className="card-title mb-3">{menuItem.mealTypeCategory}</h7>
                <img
                  className="card-img-top mx-auto"
                  src={
                    menuItem.images.length > 0
                      ? menuItem.images[0].image
                      : 'https://via.placeholder.com/75x50'
                  }
                  alt={menuItem.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-3">{menuItem.name}</h5>
                  <div className="price mb-3">
                    ${menuItem.price.toFixed(2)}&nbsp;&nbsp;
                    <span
                      className="moreSpan pointer"
                      onClick={() => handleViewDetails(menuItem)}
                    >
                      MORE
                    </span>
                  </div>

                  <button
                    type="button"
                    id="cart_btn"
                    disabled={!menuItem.isAvailable}
                    onClick={() => handleAddToCart(menuItem)}
                    className="btn  d-inline ml-4"
                    style={{ backgroundColor: '#ffa500' }}
                  >
                    {!menuItem.isAvailable ? <>Sold Out</> : <>Add to Cart</>}
                  </button>
                </div>
              </div>
                </div> */}
            <div className="col">
              <article className="menu-item">
                <img
                  src={
                    menuItem.images.length > 0
                      ? menuItem.images[0].image
                      : 'https://via.placeholder.com/75x50'
                  }
                  alt={menuItem.name}
                  className="photo"
                />
                <div className="item-info">
                  <header>
                    <h4>{menuItem.name}</h4>
                    <h4>${menuItem.price}</h4>
                  </header>
                  <p className="item-desc">{menuItem.mealTypeCategory}</p>
                  <div style={{ margin: '5%' }}>{menuItem.description}</div>
                  <div style={{ margin: '2%' }}>
                    <button
                      type="button"
                      id="cart_btn"
                      disabled={!menuItem.isAvailable}
                      onClick={() => handleAddToCart(menuItem)}
                      className="btn d-inline ms-auto"
                      style={{ backgroundColor: '#ffa500', color: 'white' }}
                    >
                      {!menuItem.isAvailable ? <>Sold Out</> : <>Add to Cart</>}
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        ))}
        {/* </div><Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Menu Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMenuItem && (
            <>
              <h3>{selectedMenuItem.name}</h3>
              <p>Price: ${selectedMenuItem.price.toFixed(2)}</p>
              <p>Description: {selectedMenuItem.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
          </Modal></> */}
      </div>
    </div>
  );
};

export default MenuList;
