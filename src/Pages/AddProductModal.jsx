/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const AddProductModal = ({ showModal, handleCloseModal, handleAddProduct, validated, newProduct, handleInputChange }) => {

  //Image Vallidation here 
  const [imageError, setImageError] = useState(null);

  const validateImage = (image) => {
    setImageError(null);

    // Check image type
    if (!image.name.match(/\.(jpg|png|jpeg)$/)) {
      setImageError('Image type must be .jpg, .jpeg or .png.');
      return false;
    }

    // Check image size (1MB limit)
    if (image.size > 1000000) {
      setImageError('Image size must be less than 1MB.');
      return false;
    }

    return true;
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const isValid = validateImage(file);
      if (isValid) {
        handleInputChange(e); // Call parent component's input change handler
      }
    }
  };
  return (

    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleAddProduct}>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a product name.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a product description.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="productSize">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product size"
              name="size"
              value={newProduct.size}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a product size.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a product category.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="productColor">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product color"
              name="color"
              value={newProduct.color}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a product color.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a valid price.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="productQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a valid quantity.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="productImage">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="imageFile"
              onChange={onFileChange}
              required
            />
            {imageError && <p className="text-danger">{imageError}</p>}
            {/* <Form.Control.Feedback type="invalid">{imageError && <p>{imageError}</p>}</Form.Control.Feedback> */}
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
