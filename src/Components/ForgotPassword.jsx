import { useState } from 'react';
import { Button, Card, Form } from 'reactstrap';
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here you would implement your logic to send a password reset email
    // For demonstration, let's assume a simple alert message for now
    alert(`Password reset email sent to ${email}`);
    setEmail(''); // Clear email input
    setIsSubmitted(true); // Set submitted flag
  };

  return (
    <>
      <h1>Forgot password</h1>
      <div className="py-5">
        <Card className="mx-auto" style={{ maxWidth: '400px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Forgot Password</Card.Title>
            <Card.Text className="text-center mb-4">
              Enter your email to reset your password
            </Card.Text>
            {isSubmitted ? (
              <div className="text-center">
                <p className="text-success font-weight-bold mb-4">
                  Password reset email sent successfully!
                </p>
                <Button variant="outline-secondary" href="/login">
                  Return to Login
                </Button>
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary" block>
                  Reset Password
                </Button>
              </Form>
            )}
            <div className="mt-4 text-center">
              Remember your password?{' '}
              <a href="/login" className="text-decoration-none">
                Sign in
              </a>
            </div>
          </Card.Body>
        </Card>
      </div>

    </>
  )
}

export default ForgotPassword