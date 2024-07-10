/* eslint-disable react/prop-types */
// CustomerDetails.js
import axios from 'axios';
import { useEffect, useState } from 'react';

const CustomerDetails = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const customerResponse = await axios.get(`http://13.201.255.228:8080/customer/${customerId}`);
        setCustomer(customerResponse.data);

        const productsResponse = await axios.get(`http://13.201.255.228:8080/customer/${customerId}/products`);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customer Details</h2>
      <p>Name: {customer.firstName} {customer.lastName}</p>
      <p>Email: {customer.email}</p>
      <p>Shop Name: {customer.shopname}</p>

      <h3>Products</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerDetails;
