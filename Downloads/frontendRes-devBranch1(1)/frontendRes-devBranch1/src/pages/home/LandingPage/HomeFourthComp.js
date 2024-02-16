import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import './index.css';

const HomeFourthComp = () => {
  return (
    <div className="HomeForthComp">
      <Container>
        <Row className="text-center">
          <Col>
            <h1
              className="mt-md-5"
              style={{ fontFamily: 'serif', fontSize: '50px' }}
            >
              Sign up to receive news and offers from us!
            </h1>
            <div className="mb-3">
              <input
                type="email"
                id="HomeFourthInput"
                className="form-control py-2 mt-5"
                placeholder="Email address*"
              />
            </div>
            <Button
              className="ms-4 my-global-button"
              // style={{
              //   borderRadius: '0px',
              //   padding: '10px 30px',
              //   backgroundColor: '#c9913a',
              //   borderColor: '#c9913a'
              // }}
            >
              Register
            </Button>
            <h5 className="mt-4">
              * We promise not to spam your inbox in any way
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeFourthComp;
