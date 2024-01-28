// /* eslint-disable no-underscore-dangle */
// /* eslint-disable react/button-has-type */
// /* eslint-disable no-shadow */
// import React, { useEffect, useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import '../../App.css';
// import { toast } from 'react-toastify';

// export default function Profile() {
//   const navigate = useNavigate();
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [name, setName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [avatar, setAvatar] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [oldPassword, setOldPassword] = useState('');

//   const handleShowEditModal = () => setShowEditModal(true);
//   const handleCloseEditModal = () => setShowEditModal(false);
//   const { id } = useParams();
//   const user = JSON.parse(localStorage.getItem('user'));
//   const userId = user._id;

//   const handleEdit = () => {
//     console.log('profile edit');
//     navigate(`/updateProfile/${userId}`);
//   };
//   const handleEditProfile = async () => {
//     try {
//       if (password === confirmPassword) {
//         const response = await axios.put(`/api/password/change/${id}`, {
//           oldPassword,
//           password,
//           confirmPassword
//         });

//         const successMessage = response.data.message;
//         toast.success(successMessage);

//         handleCloseEditModal();
//       } else {
//         toast.error('New password and confirm password must be the same.');
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         'An error occurred while updating the password.';
//       toast.error(errorMessage);
//     }
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await axios.get('/api/myprofile');
//       const { user } = response.data;
//       setName(user.name);
//       setLastName(user.lastName);
//       setEmail(user.email);
//       setPhone(user.phone);
//       setAvatar(user.avatar);
//     };
//     fetchUser();
//   }, []);

//   return (
//     <div className="container col-10 custom-table row justify-content-around my-5 user-info">
//       <h4 className="mt-4">Profile</h4>
//       <div className="col-12 col-md-3">
//         <figure className="my-4 avatar avatar-profile">
//           <img
//             className="rounded-circle img-fluid"
//             src={
//               avatar ??
//               'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
//             }
//             alt="Profile"
//           />
//         </figure>
//         <div>
//           <button className="my-4 btn m-1" onClick={handleEdit}>
//             Edit profile
//           </button>
//         </div>
//       </div>

//       <div className="col-12 my-5 col-md-5">
//         <h4>Full Name</h4>
//         <p>
//           {name} {lastName}
//         </p>

//         <h4>Email Address</h4>
//         <p>{email}</p>

//         <h4>Phone</h4>
//         <p>{phone}</p>

//         {/* Change Password Button */}
//         <button className="btn m-1" onClick={handleShowEditModal}>
//           Reset Password
//         </button>
//         <Link to="/userOrderList">
//           <button className=" btn btn-block m-1">My Orders</button>
//         </Link>

//         {/* Edit Profile Modal */}
//         <Modal show={showEditModal} onHide={handleCloseEditModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Profile</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="email">
//                 <Form.Label>Old Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   required
//                   placeholder="Enter your old password"
//                   value={oldPassword}
//                   onChange={(e) => setOldPassword(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="name">
//                 <Form.Label>New Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter your new password"
//                   value={password}
//                   required
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="name">
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Re-enter your new password"
//                   value={confirmPassword}
//                   required
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button className="btn-custom" onClick={handleCloseEditModal}>
//               Close
//             </Button>
//             <Button className="btn-custom" onClick={handleEditProfile}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         {/* End Edit Profile Modal */}
//       </div>
//     </div>
//   );
// }
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import { toast } from 'react-toastify';
import MetaData from 'layout/MetaData';

export default function Profile() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState({
    oldPassword: true,
    password: true,
    confirmPassword: true
  });

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;

  const handleEdit = () => {
    console.log('profile edit');
    navigate(`/updateProfile/${userId}`);
  };

  const handleEditProfile = async () => {
    // Check if all form fields are valid
    const isValid =
      isFormValid.oldPassword &&
      isFormValid.password &&
      isFormValid.confirmPassword;

    if (!isValid) {
      // If form is not valid, don't proceed with the API call
      toast.error('Please provide all the fields in the form.');
      return;
    }

    try {
      if (password === confirmPassword) {
        const response = await axios.put(`/api/password/change/${id}`, {
          oldPassword,
          password,
          confirmPassword
        });

        const successMessage = response.data.message;
        toast.success(successMessage);

        handleCloseEditModal();
      } else {
        toast.error('New password and confirm password must be the same.');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'An error occurred while updating the password.';
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('/api/myprofile');
      const { user } = response.data;
      setName(user.name);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setAvatar(user.avatar);
    };
    fetchUser();
  }, []);

  return (
    <div className="container col-10 custom-table row justify-content-around my-5 user-info">
      <MetaData title={user.name} />
      <h4 className="mt-4">Profile</h4>
      <div className="col-12 col-md-3">
        <figure className="my-4 avatar avatar-profile">
          <img
            className="rounded-circle img-fluid"
            src={
              avatar ??
              'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
            }
            alt="Profile"
          />
        </figure>
        <div>
          <button className="my-4 btn m-1" onClick={handleEdit}>
            Edit profile
          </button>
        </div>
      </div>

      <div className="col-12 my-5 col-md-5">
        <h4>Full Name</h4>
        <p>
          {name} {lastName}
        </p>

        <h4>Email Address</h4>
        <p>{email}</p>

        <h4>Phone</h4>
        <p>{phone}</p>

        {/* Change Password Button */}
        <button className="btn m-1" onClick={handleShowEditModal}>
          Reset Password
        </button>
        <Link to="/userOrderList">
          <button className=" btn btn-block m-1">My Orders</button>
        </Link>

        {/* Edit Profile Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Enter your old password"
                  value={oldPassword}
                  onChange={(e) =>
                    setOldPassword(e.target.value) &&
                    setIsFormValid((prev) => ({ ...prev, oldPassword: true }))
                  }
                />
              </Form.Group>
              {!isFormValid.confirmPassword && (
                <div className="text-danger">This fields are required.</div>
              )}
              <Form.Group controlId="name">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  required
                  onChange={(e) =>
                    setPassword(e.target.value) &&
                    setIsFormValid((prev) => ({ ...prev, password: true }))
                  }
                />
              </Form.Group>
              {!isFormValid.confirmPassword && (
                <div className="text-danger">This fields are required.</div>
              )}
              <Form.Group controlId="name">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  required
                  onChange={(e) =>
                    setConfirmPassword(e.target.value) &&
                    setIsFormValid((prev) => ({
                      ...prev,
                      confirmPassword: true
                    }))
                  }
                />
              </Form.Group>
              {!isFormValid.confirmPassword && (
                <div className="text-danger">This fields are required.</div>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-custom" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button className="btn-custom" onClick={handleEditProfile}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End Edit Profile Modal */}
      </div>
    </div>
  );
}
