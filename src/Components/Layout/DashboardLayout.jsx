/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const DashboardLayout = ({ isLoggedIn, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', maxHeight: '100vh', overflow: 'hidden', flexDirection: "row" }}>
      <div style={{ width: sidebarOpen ? '250px' : '50px' }}>
        <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
        <Navbar onLogout={onLogout} />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
