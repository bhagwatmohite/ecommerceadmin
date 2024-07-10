import axios from "axios";
import { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [platformCharges, setPlatformCharges] = useState({ id: null, percentage: 0 }); // State to store platform charges percentage
  const [editingCharges, setEditingCharges] = useState(false); // State to toggle editing mode
  const [newCharges, setNewCharges] = useState(""); // State to store new charges value


  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get('http://13.201.255.228:8080/allcustomer');
      const customers = response.data;
      const totalCount = customers.length; // Assuming the API response is an array of customers
      setTotalUsers(totalCount);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  //fetch all products here
  const fetchTotalProducts = async () => {

    try {
      const response = await axios.get('http://13.201.255.228:8080/allproduct');
      const products = response.data;
      const totalCount = products.length; // Assuming the API response is an array of products
      setTotalProducts(totalCount);



    } catch (error) {
      console.error('Error fetching tota; products:', error);
    }

  };

  // Fetch platform charges from API
  // Fetch platform charges from API
  const fetchPlatformCharges = async () => {
    try {
      const response = await axios.get('http://13.201.255.228:8080/all');
      const charges = response.data;
      // Assuming charges is an array and you need the first one
      const firstCharge = charges.length > 0 ? charges[0] : { id: null, percentage: 0 };
      setPlatformCharges(firstCharge);
    } catch (error) {
      console.error('Error fetching platform charges:', error);
    }
  };


  // Update platform charges via API
  const updatePlatformCharges = async () => {
    try {
      const response = await axios.put(`http://13.201.255.228:8080/update/${platformCharges.id}`, {
        percentage: newCharges // Assuming you send percentage as part of the request body
      });
      console.log('Charges updated successfully:', response.data);
      // Reset states and fetch updated data
      setEditingCharges(false);
      fetchPlatformCharges();
    } catch (error) {
      console.error('Error updating platform charges:', error);
    }
  };

  useEffect(() => {

    fetchTotalUsers();
    fetchTotalProducts();
    fetchPlatformCharges();
  }, []);


  if (platformCharges.id === null) {
    return <div>Loading...</div>; // Add loading state while fetching data
  }

  return (
    <>
      <div
        className="container "
        style={{
          display: "grid",

          maxWidth: '100vw', // Set maximum width to viewport width
          width: '100%', // Take up full width of the viewport
          padding: '0 20px', // Optional: Add horizontal padding
          boxSizing: 'border-box' // Ensure padding is included in width calculation
        }}
      >
        <h1 className="text-center p-3 mb-4 bg-secondary text-white fw-bold mt-4" style={{ borderRadius: '15px' }}>DashBoard</h1>
        <div
          className="row row-cols-1 row-cols-md-3 g-4"
          style={{

            height: '200px' // Ensure cards stretch vertically
          }}
        >
          {/* Total Users Card */}
          <div className="col">
            <div className="card h-100 bg-primary text-white">
              <div className="card-body">
                <h5 className="card-title"> Vendors</h5>
                <LuUsers />
                <p className="card-title"> Total Vendors:</p>
                <p className="card-text">{totalUsers}</p>
              </div>
            </div>
          </div>

          {/* Revenue in Month Card */}
          <div className="col">
            <div className="card h-100 bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Revenue in Month</h5>
                <RiMoneyRupeeCircleFill />
                <p className="card-text">$10,000</p>
              </div>
            </div>
          </div>

          {/* Daily User Activity Card */}
          <div className="col">
            <div className="card h-100 bg-warning text-white">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <h5 className="card-title">Products</h5>
                    <LuUsers />
                    <p className="card-text">Total Products :{totalProducts}</p>
                  </div>
                  <div className="col-6">
                    <h5 className="card-text">Category</h5> <div className="row">
                      {/* <div className="col-6">
                        <p className="card-text">Women: {womenProductsCount}</p>
                      </div>
                      <div className="col-6">
                        <p className="card-text">Men: {menProductsCount}</p>
                      </div> */}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <br></br>

        {/* Platform Charges Card */}
        <div className="row mt-4">
          <div className="col">
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">Platform Charges</h5>
                <RiMoneyRupeeCircleFill />
                {editingCharges ? (
                  <>
                    <input type="text" className="form-control mb-2" value={newCharges} onChange={(e) => setNewCharges(e.target.value)} />
                    <button className="btn btn-primary" onClick={updatePlatformCharges}>Save</button>
                  </>
                ) : (
                  <>
                    <p className="card-text">Charges: {platformCharges.percentage}%</p>
                    <h6 style={{ color: 'green', cursor: 'pointer' }} onClick={() => setEditingCharges(true)}>Edit</h6>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  );
};

export default Dashboard;
