/* eslint-disable react/prop-types */
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const CustomNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    onLogout();
    navigate('/');
  };

  return (
    <Navbar bg="light" variant="light" style={{ height: '60px', display: 'flex', justifyContent: 'end', paddingRight: '80px', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
      <Nav className="ml-auto d-flex justify-content-end">
        <CgProfile className="text-dark fs-3 pt-1" style={{ width: '37px' }} />
        <Dropdown>
          <Dropdown.Toggle variant="ligth" id="dropdown-basic" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Edit Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Settings</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
