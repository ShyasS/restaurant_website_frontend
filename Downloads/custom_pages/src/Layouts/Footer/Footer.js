import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons'
import { faLocationDot, faPhoneVolume, faEnvelope, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Button, Image } from 'react-bootstrap';
const Footer = () => {
  return (
    <div className='FooterComp'>
      <Container >
        <Row className='FooterMainRow' md={3} >
          <Col md={3} xs={9} className='ms-md-3 ms-5'>

            <h3 className='mt-md-3' style={{ color: ' #c6ac83', fontFamily: 'serif', paddingTop: '100px' }}>WE ARE HERE</h3>
            <p className='mt-md-4'>82 Place Charles de Gaulle, Paris</p>
            <p>+91 801-555-99-43</p>
          </Col>
          <Col md={1} xs={12} className="mt-md-5">
            <hr className='FooterHR1' />
          </Col>
          <Col md={3} xs={12}>
            <Image src={require('../../assets/img/grandIndiaLogo1.png')} style={{ height: '70px', width: '190px', marginTop: '90px' }} className=' ms-5' />
            <p style={{ margin: '10px 0' }} className=''>A distinctive, well-preserved and comfortable space, high-quality products, authentic cuisine, food and drinks are done flawlessly.</p>
            <FontAwesomeIcon icon={faFacebook} style={{ marginLeft: '90px' }} />
            <FontAwesomeIcon icon={faTwitter} style={{ marginLeft: '20px' }} />
            <FontAwesomeIcon icon={faPinterest} style={{ marginLeft: '20px' }} />
            <FontAwesomeIcon icon={faInstagram} style={{ marginLeft: '20px' }} />
          </Col >
          <Col md={1} xs={12} lassName="mt-md-5" >
            <hr style={{ color: '#c6ac83', marginTop: '150px' }} />
          </Col>
          <Col md={3} xs={12}>
            <h3 className='mt-md-3' id='FooterH3'>OPENING TIME</h3>
            <p className='mt-md-4' id="FooterOpenPara">82 Place Charles de Gaulle, Paris</p>
            <p id="FooterOpenPara">+91 801-555-99-43</p>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Footer