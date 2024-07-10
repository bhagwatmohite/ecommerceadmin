import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Pagination, Table } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [validated, setValidated] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);


  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);


  const [newProduct, setNewProduct] = useState({
    name: '',
    imageFile: null,
    description: '',
    price: '',
    quantity: '',
    size: '',
    category: '',
    color: '',

  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://13.201.255.228:8080/allproduct');
      setProducts(response.data); // Update products state with fetched data
      // console.log("khskjhskhs", response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowEditModal(false);
    setValidated(false);
  };

  const handleInputChange = (e) => {

    const { name, value, files } = e.target;

    if (name === 'imageFile' && files.length > 0) {
      const file = files[0]; // Get the first file from the array
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        imageFile: file, // Set the imageFile to the File object
      }));

    } else {
      // For other input fields (non-file inputs)
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };
  //Add Product
  const handleAddProduct = async (event) => {
    event.preventDefault();
    // event.stopPropagation();

    setValidated(true);

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('size', newProduct.size);
      formData.append('color', newProduct.color);
      formData.append('category', newProduct.category);
      // formData.append('stock', newProduct.stock);
      formData.append('quantity', newProduct.quantity);
      formData.append('price', newProduct.price);
      if (newProduct.imageFile) {
        formData.append('imageFile', newProduct.imageFile); // Append the File object if it exists
      }
      console.log(newProduct);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      const response = await axios.post('http://13.201.255.228:8080/product', formData);

      console.log('New Product added successfully:', response.data);
      console.log("form data", formData);
      resetForm();
      setShowModal(false);
      fetchProducts(); // Fetch products again after adding
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };


  //Reset form 
  const resetForm = () => {
    setNewProduct({
      name: '',
      imageFile: null,
      description: '',
      price: '',
      quantity: '',
      size: '',
      category: '',
      color: '',
    });
  };


  //Handle the upadate  logic
  const handleEdit = (product) => {

    setSelectedProduct(product);
    setShowEditModal(true);
    fetchProducts();
  };


  //Handle delete product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://13.201.255.228:8080/product/${productId}`);

      alert(`Product with ID ${productId} deleted successfully.`);

      fetchProducts(); // Fetch products again after deleting
    } catch (error) {
      alert(`Error deleting product with ID ${productId}:`, error);
    }

  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h1 className="text-center p-3 mb-4 bg-secondary text-white fw-bold">All Products Here</h1>

      <div className="d-flex justify-content-end p-3">

        <Button type="button" className="btn btn-dark btn-lg" onClick={handleShowModal}>
          Add Product
        </Button>
      </div>

      <Table striped bordered hover responsive >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Size</th>
            <th>Category</th>
            <th>Color</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product.id}>
              <td>
                {product.imageUrl && (
                  <img
                    src={`http://13.201.255.228:8080/uploads/${product.imageUrl}`}
                    alt={product.name}
                    className="img-thumbnail rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </td>
              {/* {console.log(` print you data : ${product.imageUrl}`)} */}


              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.size}</td>
              <td>{product.category}</td>
              <td>{product.color}</td>
              <td>₹ {product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <BsPencilSquare className="action-icon text-primary me-2" onClick={() => handleEdit(product)} />
                <BsTrash className="action-icon text-danger" onClick={() => handleDelete(product.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination with arrows instead of page numbers */}
      <div className="mt-4 d-flex justify-content-end" style={{ marginRight: '70px' }}>
        <Pagination>
          {/* Previous Button */}
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          />
          {/* Next Button */}
          <Pagination.Next
            onClick={() => setCurrentPage(currentPage < Math.ceil(products.length / itemsPerPage) ? currentPage + 1 : currentPage)}
            disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
          />
        </Pagination>
      </div>

      <AddProductModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleAddProduct={handleAddProduct}
        validated={validated}
        newProduct={newProduct}
        handleInputChange={handleInputChange}
      />

      {selectedProduct && (
        <EditProductModal
          showModal={showEditModal}
          handleCloseModal={handleCloseModal}
          handleUpdateProduct={() => {
            console.log('Updating product:', selectedProduct);
            handleCloseModal();
          }}
          validated={validated}
          product={selectedProduct}
          handleInputChange={handleInputChange}
        />
      )}
    </>
  );
};

export default Products;