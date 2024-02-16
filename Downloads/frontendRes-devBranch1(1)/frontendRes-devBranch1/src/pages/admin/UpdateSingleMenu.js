/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState('');
  const [mealTypeCategory, setMealTypeCategory] = useState('');
  const [defaultDietaryCategory, setDefaultDietaryCategory] = useState('');
  const [defaultMealCategory, setDefaultMealCategory] = useState('');
  const [dietaryCategories, setDietaryCategories] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantBranch, setRestaurantBranch] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id: productId } = useParams();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(() => [reader.result]);
          setImages(() => [file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const onIsAvailableChange = () => {
    setIsAvailable((prevIsAvailable) => !prevIsAvailable);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('isAvailable', isAvailable || false);
    formData.append('description', description);
    formData.append('restaurantId', restaurantId);
    formData.append('restaurantBranch', restaurantBranch);
    formData.append('mealTypeCategory', mealTypeCategory);
    formData.append('dietaryPreferenceCategory', dietaryPreferenceCategory);
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('imagesCleared', imagesCleared);

    try {
      // Use axios to send the form data
      await axios.put(`/api/admin/product/${productId}`, formData);

      toast('Product Updated Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });

      setImages([]);
    } catch (error) {
      toast(error.message || 'An error occurred', {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}`);
        const product = response.data.menu;

        setName(product.name);
        setPrice(product.price);
        setIsAvailable(product.isAvailable);
        setDescription(product.description);
        setRestaurantId(product.restaurantId);
        setRestaurantBranch(product.restaurantBranch);
        setDietaryPreferenceCategory(product.dietaryPreferenceCategory);
        setMealTypeCategory(product.mealTypeCategory);

        const images = product.images.map((image) => image.image);
        setImagesPreview(images);
      } catch (error) {
        toast(error.message || 'An error occurred', {
          type: 'error',
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    };

    getProductDetails();
  }, [productId]);
  useEffect(() => {
    // Fetch dietary categories from API
    axios
      .get('/api/dietary-preferences')
      .then((response) => {
        setDietaryCategories(response.data.data);

        // Set default dietary category
        if (response.data.data.length > 0) {
          setDefaultDietaryCategory(
            response.data.data[0].dietaryPreferenceCategory
          );
        }
      })
      .catch((error) =>
        console.error('Error fetching dietary categories:', error)
      );

    // Fetch meal categories from API
    axios
      .get('/api/meal-types')
      .then((response) => {
        setMealCategories(response.data.data);

        // Set default meal category
        if (response.data.data.length > 0) {
          setDefaultMealCategory(response.data.data[0].mealTypeCategory);
        }
      })
      .catch((error) =>
        console.error('Error fetching meal categories:', error)
      );
  }, []);

  return (
    <div className="col-md-5 container">
      <div className="wrapper my-5">
        <form
          onSubmit={submitHandler}
          className="address-container"
          encType="multipart/form-data"
        >
          <h4 className="mb-4">Update Menu</h4>
          <Card className="p-3">
            <div className="mb-4">
              <label htmlFor="name_field">
                Name
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                placeholder="Field is required"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price_field">
                Price
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <input
                type="text"
                id="price_field"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
                placeholder="Field is required"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description_field">
                Description
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <textarea
                className="form-control"
                id="description_field"
                rows="2"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
                placeholder="Field is required"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category_field">
                Meal Category
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <select
                onChange={(e) => setMealTypeCategory(e.target.value)}
                className="form-control"
                id="category_field"
                value={mealTypeCategory || defaultMealCategory}
                required
                placeholder="Field is required"
              >
                <option value="">Select</option>
                {mealCategories.map((mealType) => (
                  <option
                    key={mealType.mealTypeCategory}
                    value={mealType.mealTypeCategory}
                  >
                    {mealType.mealTypeCategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="category_field">
                Dietary Category
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <select
                onChange={(e) => setDietaryPreferenceCategory(e.target.value)}
                className="form-control"
                id="category_field"
                value={dietaryPreferenceCategory || defaultDietaryCategory}
                required
                placeholder="Field is required"
              >
                <option value="">Select</option>
                {dietaryCategories.map((mealType) => (
                  <option
                    key={mealType.dietaryPreferenceCategory}
                    value={mealType.dietaryPreferenceCategory}
                  >
                    {mealType.dietaryPreferenceCategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="stock_field">Is Available</label>
              <input
                type="checkbox"
                id="stock_field"
                className="form-check-input"
                onChange={onIsAvailableChange}
                checked={isAvailable}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="seller_field">
                Restaurant Id
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <input
                type="text"
                id="seller_field"
                className="form-control"
                readOnly
                onChange={(e) => setRestaurantId(e.target.value)}
                value={restaurantId}
                required
                placeholder="Field is required"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="seller_field">
                Restaurant Branch
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <input
                type="text"
                id="seller_field"
                className="form-control"
                readOnly
                onChange={(e) => setRestaurantBranch(e.target.value)}
                value={restaurantBranch}
                required
                placeholder="Field is required"
              />
            </div>

            <div className="mb-4">
              <label
                style={{
                  fontSize: '1.2rem',
                  color: '#333',
                  marginBottom: '10px',
                  display: 'block'
                }}
              >
                Images
              </label>

              <div className="custom-file" style={{ marginTop: '5px' }}>
                <input
                  type="file"
                  name="product_images"
                  className="custom-file-input"
                  id="customFile"
                  multiple
                  onChange={onImagesChange}
                  style={{
                    cursor: 'pointer',
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2
                  }}
                />

                <label
                  className="custom-file-label"
                  htmlFor="customFile"
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    backgroundColor: '#f8f9fa',
                    borderColor: '#ced4da',
                    color: '#495057'
                  }}
                >
                  Choose Images
                </label>
              </div>

              {imagesPreview.length > 0 && (
                <span
                  className="mr-2"
                  onClick={clearImagesHandler}
                  style={{
                    cursor: 'pointer',
                    marginTop: '5px',
                    color: '#007bff',
                    fontSize: '1.2rem'
                  }}
                >
                  <i className="fa fa-trash" />
                </span>
              )}

              <div
                style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}
              >
                {imagesPreview.map((image, index) => (
                  <img
                    className="mt-3 mr-2"
                    key={image}
                    src={image}
                    alt={`Image Preview ${index + 1}`}
                    width="80"
                    height="80"
                    style={{
                      borderRadius: '5px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="d-dlex justify-content-center">
              <button
                id="login_button"
                type="submit"
                className="btn my-3 my-global-button btn-block "
              >
                UPDATE
              </button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
