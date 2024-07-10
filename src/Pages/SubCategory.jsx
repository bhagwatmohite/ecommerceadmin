import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const SubCategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const fetchData = async () => {
    try {
      const subcategoryResponse = await axios.get('http://13.201.255.228:8080/getallsubcategory');
      setSubcategories(subcategoryResponse.data);

      const categoryResponse = await axios.get('http://13.201.255.228:8080/getallcategory');
      setCategories(categoryResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteSubCategory = async (subcatid) => {
    try {
      await axios.delete(`http://13.201.255.228:8080/deletesubcategory/${subcatid}`);
      alert(`Subcategory with ID ${subcatid} deleted successfully.`);
      const updatedSubcategories = subcategories.filter(subcategory => subcategory.subcatid !== subcatid);
      setSubcategories(updatedSubcategories);

    } catch (error) {
      console.error('Error deleting subcategory:', error);
      alert(`Error deleting subcategory with ID ${subcatid}: ${error.message}`);
    }
  };

  const handleEditModal = (subcategory) => {
    setSelectedSubCategory(subcategory);
    setName(subcategory.name);
    setShowEditModal(true);
  };

  const handleUpdateSubCategory = async () => {
    try {
      const data = { name };
      await axios.put(`http://13.201.255.228:8080/updatesubcategory/${selectedSubCategory.subcatid}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Subcategory updated successfully.');
      setName("");
      setShowEditModal(false);
      fetchData();
    } catch (error) {
      console.error('Error updating subcategory:', error);
      alert(`Error updating subcategory: ${error.message}`);
    }
  };

  const handleAddSubCategory = async () => {
    try {
      const data = {
        name: name,
        category: {
          id: categoryId
        }
      };
      await axios.post('http://13.201.255.228:8080/addsubcategory', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Subcategory added successfully.');
      setName("");
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Error adding subcategory:', error);
      alert(`Error adding subcategory: ${error.message}`);
    }
  };

  return (
    <>
      <div style={{ maxWidth: "1304px" }}>
        <h4 className="text-center p-3 mb-4 bg-secondary text-white fw-bold">All Subcategory</h4>
        <div className="container-fluid">
          <div className="row">
            {/* Search bar and add button */}
          </div>
          <div className="col-lg-6 col-md-12 d-flex justify-content-lg-end justify-content-md-start">
            <Button type="button" className="btn btn-dark btn-lg mb-3" onClick={() => setShowModal(true)}>
              Add Subcategory
            </Button>
          </div>
        </div>

        {/* Subcategories */}
        <div className="mt-4">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subcategories.length > 0 ? (
                  subcategories.map(subcategory => (
                    <tr key={subcategory.subcatid}>
                      <td>{subcategory.subcatid}</td>
                      <td>{subcategory.name}</td>
                      <td>
                        <BsPencilSquare
                          className="action-icon text-primary me-2"
                          onClick={() => handleEditModal(subcategory)}
                        />
                        <BsTrash
                          className="action-icon text-danger"
                          onClick={() => handleDeleteSubCategory(subcategory.subcatid)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No Subcategories found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        {/* Edit Subcategory Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Subcategory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="editSubcategoryName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateSubCategory}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add Subcategory Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Subcategory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="subcategoryName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="categorySelect">
                <Form.Label>Select Category</Form.Label>
                <Form.Select onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddSubCategory}>
              Add Subcategory
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default SubCategory;
