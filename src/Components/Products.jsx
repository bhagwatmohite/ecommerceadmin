import axios from 'axios';
import { useEffect, useState } from 'react';
import { FileEarmarkPlus, Filter, PencilSquare, Trash } from 'react-bootstrap-icons';
import { Button, Form, Modal, Table } from 'reactstrap';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    size: '',
    color: '',
    category: '',
    quantity: '',
    price: '',
    imageUrl: ''
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://13.201.255.228:8080/allproduct');
        setProducts(response.data); // Assuming API response is an array of products
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://13.201.255.228:8080/addproduct', product);
      console.log('Server response:', response.data);
      // Handle successful response
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error
    }
  };

  const handleUpdate = async (productId) => {
    try {
      const response = await axios.get(`http://13.201.255.228:8080/product/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product for update:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://13.201.255.228:8080/product/${productId}`);
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
      console.log(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete product with ID ${productId}:`, error);
    }
  };

  return (
    <>
      <main className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="font-weight-bold">Products</h1>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary">
              <Filter className="mr-1" />
              Filters
            </Button>
            <Modal.Dialog>
              <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleAddProduct}>
                  <Form.Group controlId="name">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={product.description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  {/* Other form fields go here */}
                  <Button variant="primary" type="submit">
                    Add Product <FileEarmarkPlus className="ml-1" />
                  </Button>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </div>
        </div>
        <div className="border shadow-sm rounded">
          <Table responsive hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Size</th>
                <th>Quantity</th>
                <th className="text-right">Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt="Product"
                      className="img-fluid"
                      style={{ maxWidth: '100px', height: 'auto' }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.size}</td>
                  <td>{product.quantity}</td>
                  <td className="text-right">{`${product.price} ₹`}</td>
                  <td className="text-right">
                    <Button variant="outline-primary" onClick={() => handleUpdate(product.id)}>
                      <PencilSquare />
                    </Button>{' '}
                    <Button variant="outline-danger" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </main>
    </>
  );
};

export default Products;
