import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const SliderImages = () => {

  const [sliderImages, setSliderImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const fetchData = async () => {
    try {
      const sliderResponse = await axios.get('http://13.201.255.228:8080/allsliderimages');
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
      await axios.delete(`http://13.201.255.228:8080/sliderimages/${imageId}`);
      alert(`Slider image with ID ${imageId} deleted successfully.`);
      const updatedSliderImages = sliderImages.filter(image => image.id !== imageId);
      setSliderImages(updatedSliderImages);
    } catch (error) {
      console.error('Error deleting slider image:', error);
      alert(`Error deleting slider image with ID ${imageId}: ${error.message}`);
    }
  };

  const handleEditModal = (image) => {
    setSelectedImage(image);
    setDescription(image.description);
    setShowEditModal(true);
  };

  const handleUpdateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("imageFile", imageFile);

      await axios.put(`http://13.201.255.228:8080/sliderimages/${selectedImage.id}`, formData, {
        description, imageFile
      });
      alert('Slider image updated successfully.');
      setDescription("");
      setImageFile(null);
      setShowEditModal(false);
      fetchData();
    } catch (error) {
      console.error('Error updating slider image:', error);
      alert(`Error updating slider image: ${error.message}`);
    }
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  //add slider form 
  const handleAddImage = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("imageFile", imageFile);

      await axios.post('http://13.201.255.228:8080/sliderimages', formData, {
        description, imageFile
      });
      alert('Slider image added successfully.');
      setDescription("");
      setImageFile(null);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Error adding slider image:', error);
      alert(`Error adding slider image: ${error.message}`);
    }
  };



  return (
    <div style={{ maxWidth: "1304px" }}>
      <h1 className="text-center p-3 mb-4 bg-secondary text-white fw-bold">Slider Images</h1>
      <div className="container-fluid">
        <div className="row">
          {/* Search bar and add button */}
        </div>
        <div className="col-lg-6 col-md-12 d-flex justify-content-lg-end justify-content-md-start">
          <Button type="button" className="btn btn-dark btn-lg mb-3" onClick={() => setShowModal(true)}>
            Add Image
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
                <th>Image</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sliderImages.length > 0 ? (
                sliderImages.map(image => (
                  <tr key={image.id}>
                    <td>{image.id}</td>
                    <td>
                      <img
                        src={`http://13.201.255.228:8080/sliderImages/${image.image}`}
                        alt={image.name}
                        className="img-thumbnail rounded-circle"
                        style={{ width: "60px", height: "60px", objectFit: "contain" }}
                      />
                    </td>
                    <td>{image.description}</td>
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
                  <td colSpan="4" className="text-center">No Slider Images found</td>
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
          <Modal.Title>Edit Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="editImageDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editImageFile">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="imageFile"
                onChange={handleImageFileChange}
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
          <Modal.Title>Add Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="imageDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imageFile">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="imageFile"
                onChange={handleImageFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddImage}>
            Add Image
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default SliderImages;
