/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
// /* eslint-disable no-unused-vars */
// /* eslint-disable import/no-extraneous-dependencies */
// import React from 'react';
// import {
//   MDBFooter,
//   MDBContainer,
//   MDBIcon,
//   MDBInput,
//   MDBCol,
//   MDBRow,
//   MDBBtn
// } from 'mdb-react-ui-kit';
// import ContactUs from 'pages/contactUs/contactUs';

// export default function Footer() {
//   return (
//     <MDBFooter className="text-center" color="white" bgColor="dark">
//       <MDBContainer className="p-4">
//         <section className="mb-4">
//           <MDBBtn
//             outline
//             color="light"
//             floating
//             className="m-1"
//             href="#!"
//             role="button"
//           >
//             <MDBIcon fab icon="facebook-f" />
//           </MDBBtn>

//           <MDBBtn
//             outline
//             color="light"
//             floating
//             className="m-1"
//             href="#!"
//             role="button"
//           >
//             <MDBIcon fab icon="twitter" />
//           </MDBBtn>

//           <MDBBtn
//             outline
//             color="light"
//             floating
//             className="m-1"
//             href="#!"
//             role="button"
//           >
//             <MDBIcon fab icon="google" />
//           </MDBBtn>

//           <MDBBtn
//             outline
//             color="light"
//             floating
//             className="m-1"
//             href="#!"
//             role="button"
//           >
//             <MDBIcon fab icon="instagram" />
//           </MDBBtn>

//           <MDBBtn
//             outline
//             color="light"
//             floating
//             className="m-1"
//             href="#!"
//             role="button"
//           >
//             <MDBIcon fab icon="linkedin-in" />
//           </MDBBtn>

//           <MDBBtn
//             outline
//             color="light"
//             floating
//             className="m-1"
//             href="#!"
//             role="button"
//           >
//             <MDBIcon fab icon="github" />
//           </MDBBtn>
//         </section>

//         <section className="">
//           {/* <form action=""> */}
//           <MDBRow style={{ width: '100%' }}>
//             <MDBCol size="auto">
//               <ContactUs />
//             </MDBCol>
//           </MDBRow>
//           {/* </form> */}
//         </section>

//         <section className="mb-4">
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
//             distinctio earum repellat quaerat voluptatibus placeat nam, commodi
//             optio pariatur est quia magnam eum harum corrupti dicta, aliquam
//             sequi voluptate quas.
//           </p>
//         </section>

//         <section className="">
//           <MDBRow>
//             <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
//               <ul className="list-unstyled mb-0">
//                 <li>
//                   <a href="#!" className="text-white">
//                     Link 1
//                   </a>
//                 </li>
//               </ul>
//             </MDBCol>

//             <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
//               <ul className="list-unstyled mb-0">
//                 <li>
//                   <a href="#!" className="text-white">
//                     Link 2
//                   </a>
//                 </li>
//               </ul>
//             </MDBCol>

//             <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
//               <ul className="list-unstyled mb-0">
//                 <li>
//                   <a href="#!" className="text-white">
//                     Link 3
//                   </a>
//                 </li>
//               </ul>
//             </MDBCol>

//             <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
//               <ul className="list-unstyled mb-0">
//                 <li>
//                   <a href="#!" className="text-white">
//                     Link 4
//                   </a>
//                 </li>
//               </ul>
//             </MDBCol>
//           </MDBRow>
//         </section>
//       </MDBContainer>

//       <div
//         className="text-center p-3"
//         style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
//       >
//         © 2023 Copyright:
//         <a className="text-white" href="https://www.grandindianh.com/">
//           Grand India
//         </a>
//       </div>
//     </MDBFooter>
//   );
// }
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faPinterest
} from '@fortawesome/free-brands-svg-icons';
import { Image } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className="FooterComp">
      <Container>
        <Row className="FooterMainRow" md={3}>
          <Col md={3} xs={9} className="ms-md-3 ms-5">
            <h3
              className="mt-md-3"
              style={{
                color: ' #c6ac83',
                fontFamily: 'serif',
                paddingTop: '100px'
              }}
            >
              WE ARE HERE
            </h3>
            <p className="mt-md-4">82 Place Charles de Gaulle, Paris</p>
            <p>+91 801-555-99-43</p>
          </Col>
          <Col md={1} xs={12} className="mt-md-5">
            <hr className="FooterHR1" />
          </Col>
          <Col md={3} xs={12}>
            <Image
              src={require('../assets/img/grandIndiaLogo1.png')}
              style={{ height: '70px', width: '190px', marginTop: '90px' }}
              className=" ms-4"
            />
            <p style={{ margin: '10px 0' }} className="">
              A distinctive, well-preserved and comfortable space, high-quality
              products, authentic cuisine, food and drinks are done flawlessly.
            </p>
            <FontAwesomeIcon icon={faFacebook} style={{ marginLeft: '50px' }} />
            <FontAwesomeIcon icon={faTwitter} style={{ marginLeft: '20px' }} />
            <FontAwesomeIcon
              icon={faPinterest}
              style={{ marginLeft: '20px' }}
            />
            <FontAwesomeIcon
              icon={faInstagram}
              style={{ marginLeft: '20px' }}
            />
          </Col>
          <Col md={1} xs={12} lassName="mt-md-5">
            <hr style={{ color: '#c6ac83', marginTop: '150px' }} />
          </Col>
          <Col md={3} xs={12}>
            <h3 className="mt-md-3" id="FooterH3">
              OPENING TIME
            </h3>
            <p className="mt-md-4" id="FooterOpenPara">
              82 Place Charles de Gaulle, Paris
            </p>
            <p id="FooterOpenPara">+91 801-555-99-43</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
