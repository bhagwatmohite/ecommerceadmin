
import { Table } from 'react-bootstrap';

const Reports = () => {
  // Example customer data
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      mobile: '123-456-7890',
      email: 'john@example.com',
      report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      mobile: '987-654-3210',
      email: 'jane@example.com',
      report: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    // Add more customers as needed
  ];

  return (
    <>
      <h1 className="mb-4">Reports</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Report/Description</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.mobile}</td>
              <td>{customer.email}</td>
              <td>{customer.report}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Reports;
