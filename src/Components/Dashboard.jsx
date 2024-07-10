// import { BsBag, BsBox, BsCreditCard, BsGraphUp, BsHouse, BsPeople, BsTruck } from 'react-icons/bs';
// import { Badge } from 'reactstrap';
// import Products from './Products';


import Sidebar from './Sidebar';


const Dashboard = () => {
  return (
    <>

      {/* <Products></Products> */}
      {/* <Sidebar></Sidebar> */}
      {/* Main content area */}
      {/* <Header></Header> */}
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h1>Main Content</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container-fluid px-0 py-0">


        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-4">
              <div className="card-header">
                <BsBox className="me-2" />
                Ezio Admin
              </div>
              <div className="card-body">
                <nav className="nav flex-column">
                  <a className="nav-link" href="#">
                    <BsHouse className="me-1" />
                    Dashboard
                  </a>
                  <a className="nav-link" href="#">
                    <BsBag className="me-1" />
                    Orders
                    <Badge color="secondary" className="ms-auto">6</Badge>
                  </a>
                  <a className="nav-link" href="#">
                    <BsBox className="me-1" />
                    Products
                  </a>
                  <a className="nav-link" href="#">
                    <BsPeople className="me-1" />
                    Customers
                  </a>
                  <a className="nav-link" href="#">
                    <BsGraphUp className="me-1" />
                    Analytics
                  </a>
                  <a className="nav-link" href="#">
                    <BsTruck className="me-1" />
                    Shipping
                  </a>
                  <a className="nav-link" href="#">
                    <BsCreditCard className="me-1" />
                    Payments
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Dashboard;
