import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup, Table } from 'react-bootstrap';
import { BiShow } from 'react-icons/bi';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import AddVendor from './AddVendor';
import EditVendor from './EditVendor';
import VendorProducts from './VendorProducts';

const Vendors = () => {
  const [customerData, setCustomerData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showVendorProducts, setShowVendorProducts] = useState(false);
  const [selectedVendorData, setSelectedVendorData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://13.201.255.228:8080/allcustomer');
      setCustomerData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`http://13.201.255.228:8080/deletecustomer/${customerId}`);
      alert(`Customer with ID ${customerId} deleted successfully.`);
      fetchData();
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert(`Error deleting customer with ID ${customerId}: ${error.message}`);
    }
  };

  const handleEditModal = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    const updatedData = customerData.map((customer) =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomerData(updatedData);
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomerData([...customerData, newCustomer]);
  };

  const handleViewProducts = async (customerId) => {
    try {
      const response = await axios.get(`http://13.201.255.228:8080/customer/${customerId}`);
      setSelectedVendorData(response.data);
      setShowVendorProducts(true);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
      alert(`Error fetching vendor data: ${error.message}`);
    }
  };

  const filteredCustomers = customerData.filter((customer) => {
    const nameMatch = customer.firstName.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  return (
    <>
      <div style={{ maxWidth: "1304px" }}>
        <h1 className="text-center p-3 mb-4 bg-secondary text-white fw-bold" style={{ borderRadius: '15px' }}>Vendor Information</h1>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <InputGroup className="mb-3" style={{ maxWidth: '300px' }}>
                <FormControl
                  placeholder="Search by vendor name or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="col-lg-6 col-md-12 d-flex justify-content-lg-end justify-content-md-start">
              <Button type="button" className="btn btn-dark btn-lg mb-3" onClick={() => setShowAddModal(true)}>
                Add Vendors
              </Button>
            </div>
          </div>
        </div>

        {showVendorProducts && selectedVendorData ? (
          <VendorProducts vendorData={selectedVendorData} />
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover responsive>
              <thead>
                <tr>

                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Mobile No</th>
                  <th>Shop name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Pincode</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>View Products</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id}>

                      <td>{customer.id}</td>
                      <td>{customer.firstName}</td>
                      <td>{customer.lastName}</td>
                      <td>{customer.email}</td>
                      <td>{customer.password}</td>
                      <td>{customer.mobileNumber}</td>
                      <td>{customer.shopname}</td>
                      <td>{customer.address}</td>
                      <td>{customer.city}</td>
                      <td>{customer.state}</td>
                      <td>{customer.pincode}</td>
                      <td>{customer.status}</td>
                      <td>
                        <BsPencilSquare
                          className="action-icon text-primary me-2"
                          onClick={() => handleEditModal(customer)}
                        />
                        <BsTrash
                          className="action-icon text-danger"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        />
                      </td>
                      <td>
                        <BiShow
                          className="action-icon text-primary me-2"
                          onClick={() => handleViewProducts(customer.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="14" className="text-center">No Vendor found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}

        {selectedCustomer && (
          <EditVendor
            customer={selectedCustomer}
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            handleUpdate={handleUpdateCustomer}
          />
        )}

        <AddVendor
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          handleAddCustomer={handleAddCustomer}
        />
      </div>
    </>
  );
};

export default Vendors;
