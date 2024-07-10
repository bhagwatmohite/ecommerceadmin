/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Form, FormGroup, Input, Label } from 'reactstrap';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://13.201.255.228:8080/login', { email, password });

      if (response.status === 200) {
        const userData = response.data; // Assuming response.data contains user data

        localStorage.setItem('userData', JSON.stringify(userData));

        if (onLogin) {
          onLogin(userData);
        }

        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError('Invalid email or password. Please try again.');
      } else {
        setLoginError('Login failed. Please try again later.');
      }
      console.error('Login failed:', error);
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
      setEmailError('Invalid email. Please enter a correct email format.');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="container mt-5">
      <Card className="p-4 mx-auto" style={{ width: '500px', display: 'flex', justifyContent: 'center' }}>
        <h1 className="text-center mb-4">Login</h1>
        {loginError && <Alert color="danger">{loginError}</Alert>}
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <small className="text-danger">{emailError}</small>}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"

              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button color="primary" block>
            Login
          </Button>
        </Form>
        <div className="text-center mt-3">
          <p>Don't have an account? <Link to={"/signUp"}>Sign up</Link></p>
          <p><Link to={"/forgotPassword"}>Forgot your password?</Link></p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
