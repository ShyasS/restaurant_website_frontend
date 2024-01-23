/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */

import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
// import Sidebar from './Sidebar';

export default function CreateMenu() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState('');
  const [mealTypeCategory, setMealTypeCategory] = useState('');
  // const [itemQuantity, setItemQuantity] = useState(0);
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantBranch, setRestaurantBranch] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { role } = user;

  const dietaryCategory = [
    'Vegetarian',
    'Non-vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal',
    'Other'
  ];
  const mealCategory = [
    'Appetizers',
    'Main Course',
    'Desserts',
    'Beverages',
    'Other'
  ];

  // const navigate = useNavigate();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const handleCheckboxChange = () => {
    setIsAvailable(!isAvailable); // Toggle the checkbox value
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      // formData.append('itemQuantity', itemQuantity);
      formData.append('description', description);
      formData.append('restaurantId', restaurantId);
      formData.append('restaurantBranch', restaurantBranch);
      formData.append('dietaryPreferenceCategory', dietaryPreferenceCategory);
      formData.append('mealTypeCategory', mealTypeCategory);
      formData.append('isAvailable', isAvailable);

      images.forEach((image) => {
        formData.append('images', image);
      });

      await axios.post('/api/admin/product/new', formData);

      toast('Product Created Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });

      // navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Error creating product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { restaurantId, restaurantBranch } = user;
    setRestaurantId(restaurantId);
    setRestaurantBranch(restaurantBranch);
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error'
      });
    }
  }, [error]);

  return (
    <div className="row">
      <div className="col-12 col-md-10">
        <>
          <div className="wrapper my-5">
            <form
              onSubmit={submitHandler}
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mb-4">New Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Meal Category</label>
                <select
                  onChange={(e) => setMealTypeCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                >
                  <option value="">Select</option>
                  {mealCategory.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category_field">Dietary Category</label>
                <select
                  onChange={(e) => setDietaryPreferenceCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                >
                  <option value="">Select</option>
                  {dietaryCategory.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {role === 'superAdmin' && (
                <>
                  <div className="form-group">
                    <label htmlFor="seller_field">Restaurant Id</label>
                    <input
                      type="text"
                      id="seller_field"
                      className="form-control"
                      onChange={(e) => setRestaurantId(e.target.value)}
                      value={restaurantId}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="seller_field">Restaurant Branch</label>
                    <input
                      type="text"
                      id="seller_field"
                      className="form-control"
                      onChange={(e) => setRestaurantBranch(e.target.value)}
                      value={restaurantBranch}
                    />
                  </div>
                </>
              )}
              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={onImagesChange}
                  />

                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>
                {imagesPreview.map((image, index) => (
                  <img
                    className="mt-3 mr-2"
                    key={index}
                    src={image}
                    alt={`Image Preview ${index + 1}`}
                    width="55"
                    height="52"
                  />
                ))}
              </div>
              <div className="form-group">
                <label htmlFor="vegetarian_checkbox">Is Available</label>
                <input
                  type="checkbox"
                  id="vegetarian_checkbox"
                  checked={isAvailable}
                  onChange={handleCheckboxChange}
                />
              </div>

              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block py-3"
              >
                CREATE
              </button>
            </form>
          </div>
        </>
      </div>
    </div>
  );
}
