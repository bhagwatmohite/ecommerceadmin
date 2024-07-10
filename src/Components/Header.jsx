import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, InputGroup } from 'react-bootstrap';

export default function Header() {
  return (
    <header className="sticky-top d-flex justify-content-between align-items-center border-bottom bg-gray-100 bg-opacity-40 px-3 py-2">
      {/* Search Input */}
      <InputGroup className="flex-grow-1">
        <InputGroup.Text>
          <i className="fas fa-search text-gray-500"></i>
        </InputGroup.Text>
        <input
          className="form-control bg-white shadow-none"
          placeholder="Search products..."
          type="search"
        />
      </InputGroup>

      {/* User Dropdown */}
      <Dropdown align="end">
        <Dropdown.Toggle
          className="rounded-circle border border-gray-200"
          variant="light"
          id="dropdown-user"
        >
          <i className="fas fa-user"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Header>My Account</Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item href="/dashboard/account/settings">
            Settings
          </Dropdown.Item>
          <Dropdown.Item href="/dashboard/account/supports">
            Supports
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item >Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
}
