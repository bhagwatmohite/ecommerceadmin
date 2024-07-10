/* eslint-disable no-unused-vars */

import axios from 'axios';
import { useState } from 'react';
import { Alert, Button, Card, Form, FormGroup, Input, Label } from 'reactstrap';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setIsFormValid(false);
        return;
      }

      if (email === '') {
        setEmailError('Email should not be empty!');
        return;
      }

      const response = await axios.post('http://13.201.255.228:8080/registeruser', {
        username,
        email,
        password,

      });

      if (response.status >= 200 && response.status < 300) {
        setSignupSuccess(true);
        // Redirect to login page after successful signup
        // Replace '/login' with your actual login route
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Signup failed:', error);

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

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (!validateEmail(value) && value.length > 0) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  return (
    <>
      <div>Signup</div>
      <div className="py-5">
        <Card className="p-4 mx-auto" style={{ maxWidth: '400px' }}>
          <h1 className="text-center mb-4">Sign Up</h1>
          <Form onSubmit={handleSignUp}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <small className="text-danger">{emailError}</small>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {password !== confirmPassword && <small className="text-danger">Passwords do not match</small>}
            </FormGroup>
            {!isFormValid && <Alert color="danger">Please fill out all required fields correctly</Alert>}
            {signupSuccess && (
              <Alert color="success">Sign up successful! Please proceed to login.</Alert>
            )}
            <Button type="submit" color="primary" block>
              Create an account
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Already have an account?{' '}
              <a href="/" className="text-decoration-underline">
                Sign in
              </a>
            </p>
          </div>
        </Card>
      </div>
    </>

  )
}

export default Signup