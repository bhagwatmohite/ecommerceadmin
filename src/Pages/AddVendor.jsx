/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const AddVendor = ({ show, handleClose, handleAddCustomer }) => {

  const [emailExists, setEmailExists] = useState(false);
  const [emailError, setEmailError] = useState('');



  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    address: '',
    city: '',
    shopname: '',
    state: '',
    pincode: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });


  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post('http://13.201.255.228:8080/addcustomer', formData);
      if (response.status === 201) {
        handleAddCustomer(response.data); // Update parent component state with added customer data
        handleClose(); // Close the modal
        // Reset form data after successful addition (optional)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          password: '',
          shopname: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          status: ''
        });
      }
      alert("Customer added successfully");
    } catch (error) {
      console.error('Error adding customer:', error);
      if (error.response) {
        // Example: Check if email already exists based on error response
        if (error.response.status === 400 && error.response.data.includes('already exists')) {
          setEmailExists(true);
          setEmailError('Email already exists');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error:', error.message);
      }

    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <small className="text-danger">{emailError}</small>}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="mobileNumber">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                type="number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="shopname">
              <Form.Label>Shope name</Form.Label>
              <Form.Control
                type="text"
                name="shopname"
                value={formData.shopname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Select a status</option>
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label> Adress</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label> City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label> State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="pincode">
              <Form.Label> Pincode</Form.Label>
              <Form.Control
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* Add more form fields for other customer properties */}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default AddVendor