import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import SubCategory from "./SubCategory";

const Category = () => {

  const [sliderImages, setSliderImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");



  const fetchData = async () => {
    try {
      const sliderResponse = await axios.get('http://13.201.255.228:8080/getallcategory');
      setSliderImages(sliderResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteSliderImage = async (imageId) => {
    try {
      await axios.delete(`http://13.201.255.228:8080/deletecategory/${imageId}`);
      alert(`Category with ID ${imageId} deleted successfully.`);
      const updatedSliderImages = sliderImages.filter(image => image.id !== imageId);
      setSliderImages(updatedSliderImages);
    } catch (error) {
      console.error('Error deleting slider image:', error);
      alert(`Error deleting slider image with ID ${imageId}: ${error.message}`);
    }
  };

  const handleEditModal = (image) => {
    setSelectedImage(image);
    setName(image.name);
    setShowEditModal(true);
  };

  const handleUpdateImage = async () => {
    try {
      const data = { name };


      await axios.put(`http://13.201.255.228:8080/updatecategory/${selectedImage.id}`, data, {
        headers: {
          'Content-Type': 'application/json' // Set content type to application/json
        }
      });
      alert('Category updated successfully.');
      setName("");

      setShowEditModal(false);
      fetchData();
    } catch (error) {
      console.error('Error updating slider image:', error);
      alert(`Error updating slider image: ${error.message}`);
    }
  };


  //add slider form 
  const handleAddImage = async () => {
    try {
      const data = { name }; // Prepare data as JSON
      await axios.post('http://13.201.255.228:8080/addcategory', data, {
        headers: {
          'Content-Type': 'application/json' // Set content type to application/json
        }
      });
      alert('Category added successfully.');
      setName("");
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Error adding category:', error);
      alert(`Error adding category: ${error.message}`);
    }
  };

  return (
    <>

      <div style={{ maxWidth: "1304px" }}>
        <h1 className="text-center p-3 mb-4 bg-secondary text-white fw-bold">All Category</h1>
        <div className="container-fluid">
          <div className="row">
            {/* Search bar and add button */}
          </div>
          <div className="col-lg-6 col-md-12 d-flex justify-content-lg-end justify-content-md-start">
            <Button type="button" className="btn btn-dark btn-lg mb-3" onClick={() => setShowModal(true)}>
              Add Category
            </Button>
          </div>
        </div>

        {/* Slider images */}
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
                {sliderImages.length > 0 ? (
                  sliderImages.map(image => (
                    <tr key={image.id}>
                      <td>{image.id}</td>
                      <td>{image.name}</td>

                      <td>
                        <BsPencilSquare
                          className="action-icon text-primary me-2"
                          onClick={() => handleEditModal(image)}
                        />
                        <BsTrash
                          className="action-icon text-danger"
                          onClick={() => handleDeleteSliderImage(image.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No Catrgoryfound</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        {/* Add Image Modal */}
        {/* Edit Image Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="editImageDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
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
            <Button variant="primary" onClick={handleUpdateImage}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add Image Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="imageDescription">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddImage}>
              Add Category
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
      <SubCategory></SubCategory>
    </>
  )
}

export default Category