import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown, FormControl, InputGroup, Pagination } from "react-bootstrap";

const Stocks = () => {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStockStatus, setSelectedStockStatus] = useState(""); // New state for selected stock status
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('http://13.201.255.228:8080/allproduct');
        setProductData(response.data);

        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const filteredProducts = productData.filter(product => {
    const isNameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isCategoryMatch = selectedCategory === "" || product.category === selectedCategory;
    const isStockMatch = selectedStockStatus === "" ||
      (selectedStockStatus === "inStock" && product.quantity > 0) ||
      (selectedStockStatus === "outOfStock" && (!product.quantity || product.quantity <= 0));

    return isNameMatch && isCategoryMatch && isStockMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h1 className="text-center p-3 mb-4 bg-secondary text-white fw-bold mt-4">Available stock</h1>
      <div className="mt-4">
        <InputGroup className="mb-3" style={{ width: '700px' }}>
          <FormControl
            placeholder="Search by product name"
            aria-label="Search by product name"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Dropdown onSelect={(e) => setSelectedCategory(e)}>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              {selectedCategory === "" ? "Select Category" : selectedCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">All Categories</Dropdown.Item>
              {categories.map((category, index) => (
                <Dropdown.Item key={index} eventKey={category}>{category}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={(e) => setSelectedStockStatus(e)}> {/* Dropdown for stock status */}
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              {selectedStockStatus === "" ? "Stock Status" : (selectedStockStatus === "inStock" ? "In Stock" : "Out of Stock")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">All</Dropdown.Item>
              <Dropdown.Item eventKey="inStock">In Stock</Dropdown.Item>
              <Dropdown.Item eventKey="outOfStock">Out of Stock</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup>

        <div className="table-responsive mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>

                <th>Stock</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>

                    <td>{product.quantity ? `${product.quantity} In stock` : 'Out of Stock'}</td>
                    <td>₹{product.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 d-flex justify-content-end">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage < Math.ceil(filteredProducts.length / itemsPerPage) ? currentPage + 1 : currentPage)}
              disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
            />
          </Pagination>
        </div>
      </div>
    </>
  )
}

export default Stocks;
