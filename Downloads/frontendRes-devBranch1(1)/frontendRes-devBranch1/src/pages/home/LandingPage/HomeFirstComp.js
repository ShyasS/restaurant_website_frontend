/* eslint-disable global-require */
import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import './index.css';

const HomeFirstComp = () => {
  return (
    <div className="HomeMainFirst">
      <Container>
        <Row>
          <Col xs={12} md={{ span: 8, offset: 2 }}>
            <h1 className="text-center text-white " id="HomeH1Tag">
              Welcome to Grand India Restaurants
            </h1>
            <h6 className="text-center text-white py-5">
              THE PERFECT CHOICE FOR YOUR RESTAURANT
            </h6>
            <h1
              className="text-center text-white "
              style={{ fontFamily: 'serif' }}
            >
              ITS TIME TO ENJOY THE{' '}
              <span style={{ color: 'orange', fontSize: '50px' }}>
                FINER THINGS{' '}
              </span>{' '}
              IN LIFE.{' '}
            </h1>
          </Col>
        </Row>
      </Container>

      <Col md={2} xs={2}>
        <Image
          src={require('../../../assets/img/left.png')}
          className="HomeImg2"
        />
        <Image
          src={require('../../../assets/img/Right.png')}
          className="HomeImg1"
        />
      </Col>
    </div>
  );
};

export default HomeFirstComp;
