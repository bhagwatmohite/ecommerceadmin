/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';
const Payments = () => {
  // State to manage payments data
  const [payments, setPayments] = useState([
    {
      id: 1,
      date: '2024-05-13',
      amount: 100.0,
      user: 'John Doe',
      paymentsmethods: "upi",
      status: "completed"
      // Add other relevant details
    },
    {
      id: 2,
      date: '2024-05-12',
      amount: 50.0,
      user: 'Jane Smith',
      paymentsmethods: "upi",
      status: "completed"
      // Add other relevant details
    },
    {
      id: 3,
      date: '2024-05-13',
      amount: 110.0,
      user: 'Jane Smith',
      paymentsmethods: "upi",
      status: "completed"
      // Add other relevant details
    },
    {
      id: 4,
      date: '2024-05-14',
      amount: 1110.0,
      user: 'Jane Smith',
      paymentsmethods: "upi",
      status: "completed"
      // Add other relevant details
    },
    {
      id: 5,
      date: '2024-05-17',
      amount: 50.0,
      user: 'bhagwat Smith',
      paymentsmethods: "upi",
      status: "completed"
      // Add other relevant details
    },
    // Add more payments as needed
  ]);

  // Find the latest payment
  const latestPayment = [...payments].sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return (
    <div>
      {/* <h2>Latest Payment</h2> */}
      <h1 className="text-center p-3 mb-4 bg-secondary text-white fw-bold mt-4">All Payments</h1>
      {latestPayment && (
        <Card className="mb-4" style={{ maxHeight: '300px', maxWidth: '300px', overflowY: 'auto' }}>
          <h2 className='ml-4'>Latest Payment</h2>
          <Card.Body>
            <Card.Text>User ID: {latestPayment.id}</Card.Text>
            <Card.Text>
              Date: {latestPayment.date}<br />
              Amount: {latestPayment.amount}
              {/* Add other relevant details */}
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      <h2>All Payments</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Date</th>
            <th>Amount</th>
            <th>User</th>
            <th>Payment Method</th>
            <th>Status</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.date}</td>
              <td>{payment.amount}</td>
              <td>{payment.user}</td>
              <td>{payment.paymentsmethods}</td>
              <td>{payment.status}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Payments;