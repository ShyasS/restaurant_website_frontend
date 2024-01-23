/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function UpdateProfile() {
  const userId = JSON.parse(sessionStorage.getItem('user'));
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/public/logo192.png');
  const id = userId._id;
  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('lastName', lastName);
      formData.append('phone', phone);
      formData.append('avatar', avatar);

      const response = await axios.put(`/api/update1/${id}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      });

      console.log('Server Response:', response.data);

      if (response.data.success) {
        toast('Profile updated successfully', {
          type: 'success',
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : 'Internal Server Error';
      toast(errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error'
      });
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
      setAvatarPreview(user.avatar);
    };
    fetchUser();
  }, []);

  return (
    <div className="container my-5">
      <div className="col-10 custom-table col-lg-8 mx-auto my-2">
        <form
          onSubmit={submitHandler}
          //   className="shadow-lg"
          encType="multipart/form-data"
        >
          <div className="mt-4">
            <h4 className="mt-4 my-3">Update Profile</h4>
          </div>

          <div className="form-group mx-5 my-2">
            <label htmlFor="name_field">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mx-5 my-2">
            <label htmlFor="lastName_field">Last Name</label>
            <input
              type="name"
              id="lastName_field"
              className="form-control"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group mx-5 my-2">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mx-5 my-2">
            <label htmlFor="phone_field">Phone</label>
            <input
              type="tel"
              id="phone_field"
              className="form-control"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4 my-2 mx-5">
            <label htmlFor="customFile">Avatar</label>

            <div className="custom-file">
              <input
                type="file"
                name="avatar"
                className="form-control"
                alt="Avatar Preview"
                id="customFile"
                onChange={onChangeAvatar}
              />

              <label className="custom-file-label" htmlFor="customFile">
                Chosen Avatar
              </label>
            </div>

            <figure className="image-preview mt-3">
              <img
                className="mr-2 mb-2"
                src={avatarPreview}
                width="55"
                height="52"
              />
            </figure>
          </div>
          {/* <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="Avatar Preview"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChangeAvatar}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div> */}

          <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

// /* eslint-disable no-shadow */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/img-redundant-alt */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const UpdateProfile = () => {
//   const [name, setName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [images, setImages] = useState([]);
//   const [imagesCleared, setImagesCleared] = useState(false);
//   const [imagesPreview, setImagesPreview] = useState([]);
//   const { id: userId } = useParams();

//   const onImagesChange = (e) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setImagesPreview(reader.result);
//         setImages(e.target.files[0]);
//       }
//     };

//     reader.readAsDataURL(e.target.files[0]);
//     const files = Array.from(e.target.files);

//     files.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setImagesPreview(() => [reader.result]);
//           setImages(() => [file]);
//         }
//       };

//       reader.readAsDataURL(file);
//     });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('lastName', lastName);
//     formData.append('email', email);
//     images.forEach((image) => {
//       formData.append('images', image);
//     });
//     formData.append('imagesCleared', imagesCleared);

//     try {
//       // Use axios to send the form data
//       await axios.put(`/api/update1/${userId}`, formData);

//       toast('User Updated Successfully!', {
//         type: 'success',
//         position: toast.POSITION.BOTTOM_CENTER
//       });

//       setImages([]);
//     } catch (error) {
//       toast(error.message || 'An error occurred', {
//         type: 'error',
//         position: toast.POSITION.BOTTOM_CENTER
//       });
//     }
//   };

//   const clearImagesHandler = () => {
//     setImages([]);
//     setImagesPreview([]);
//     setImagesCleared(true);
//   };

//   useEffect(() => {
//     const getProductDetails = async () => {
//       try {
//         const response = await axios.get(`/api/myprofile/${userId}`);
//         const user = response.data.menu;

//         setName(user.name);
//         setLastName(user.lastName);
//         setEmail(user.email);

//         const images = user.images.map((image) => image.image);
//         setImagesPreview(images);
//       } catch (error) {
//         toast(error.message || 'An error occurred', {
//           type: 'error',
//           position: toast.POSITION.BOTTOM_CENTER
//         });
//       }
//     };

//     getProductDetails();
//   }, [userId]);

//   return (
//     <div className="col-4">
//       <div className="wrapper my-5">
//         <form
//           onSubmit={submitHandler}
//           className="address-container"
//           encType="multipart/form-data"
//         >
//           <h1 className="mb-4">Update Product</h1>

//           <div className="mb-4">
//             <label htmlFor="name_field">
//               Name
//               <span className="text-danger">
//                 {' '}
//                 <b>*</b>
//               </span>
//             </label>
//             <input
//               type="text"
//               id="name_field"
//               className="form-control"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//               placeholder="Field is required"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="lastName_field">
//               Last Name
//               <span className="text-danger">
//                 {' '}
//                 <b>*</b>
//               </span>
//             </label>
//             <input
//               type="text"
//               id="lastName_field"
//               className="form-control"
//               onChange={(e) => setLastName(e.target.value)}
//               value={lastName}
//               required
//               placeholder="Field is required"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email_field">
//               Email
//               <span className="text-danger">
//                 {' '}
//                 <b>*</b>
//               </span>
//             </label>
//             <input
//               type="text"
//               id="email_field"
//               className="form-control"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               required
//               placeholder="Field is required"
//             />
//           </div>
//           <div className="mb-4">
//             <label>Images</label>

//             <div className="custom-file">
//               <input
//                 type="file"
//                 name="product_images"
//                 className="custom-file-input"
//                 id="customFile"
//                 multiple
//                 onChange={onImagesChange}
//               />

//               <label className="custom-file-label" htmlFor="customFile">
//                 Choose Images
//               </label>
//             </div>

//             {imagesPreview.length > 0 && (
//               <span
//                 className="mr-2"
//                 onClick={clearImagesHandler}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <i className="fa fa-trash" />
//               </span>
//             )}
//             {imagesPreview.map((image) => (
//               <img
//                 className="mt-3 mr-2"
//                 key={image}
//                 src={image}
//                 alt="Image Preview"
//                 width="55"
//                 height="52"
//               />
//             ))}
//           </div>

//           <button id="login_button" type="submit" className="btn btn-block ">
//             UPDATE
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;
