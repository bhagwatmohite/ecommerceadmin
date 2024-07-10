/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const EditProductModal = ({ showModal, handleCloseModal, handleUpdateProduct, product, validated }) => {
  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    size: product.size || '',
    category: product.category || '',
    color: product.color || '',
    price: product.price || '',
    quantity: product.quantity || '',
    imageFile: null, // File input will be updated separately
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imageFile: file });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, description, size, category, color, price, quantity, imageFile } = formData;

      // Create a new object with the updated fields
      const updatedProduct = {
        id: product.id,
        name,
        description,
        size,
        category,
        color,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      };

      // Create FormData to send to the server
      const formDataToSend = new FormData();

      // Append updated fields to FormData
      for (const key in updatedProduct) {
        formDataToSend.append(key, updatedProduct[key]);
      }

      // If there's a new image selected, append it to the FormData
      if (imageFile) {
        formDataToSend.append('imageFile', imageFile);
      }

      // Make the API request to update the product
      const response = await axios.put(`http://13.201.255.228:8080/product/${product.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product updated successfully:', response.data);

      // Call the parent handler to indicate successful update
      handleUpdateProduct();
      handleCloseModal(); // Close the modal after update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };


  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.description}
              onChange={handleChange}
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
              value={formData.size}
              onChange={handleChange}
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
              value={formData.category}
              onChange={handleChange}
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
              value={formData.color}
              onChange={handleChange}
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
              value={formData.price}
              onChange={handleChange}
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
              value={formData.quantity}
              onChange={handleChange}
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
              onChange={handleFileChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
