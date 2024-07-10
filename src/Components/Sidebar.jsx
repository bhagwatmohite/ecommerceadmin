import {
  FaBars,
  FaRegChartBar,
  FaShoppingBag,
  FaTh,
  FaThList
} from "react-icons/fa";

import { ImUsers } from "react-icons/im";
import { MdPayments } from "react-icons/md";
import { NavLink } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {
  const toggle = () => setSidebarOpen(!sidebarOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />

    },

    {
      path: "vendors",
      name: "Vendors",
      // icon: <FaUserAlt />
      icon: <ImUsers />
    },


    {
      path: "/sliderimages",
      name: "SliderImages",
      icon: <FaShoppingBag />
    },
    {
      path: "/category",
      name: "Category",
      icon: <FaRegChartBar />
    },


    {
      path: "payments",
      name: "Payments",

      icon: <MdPayments />
    },
    {
      path: "reports",
      name: "Reports",
      icon: <FaThList />
    },
  ]
  return (
    <div className="container" style={{ overflow: 'hidden !important' }}>
      <div style={{ width: sidebarOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: sidebarOpen ? "block" : "none" }} className="logo">Ezio</h1>
          <div style={{ marginLeft: sidebarOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <div className="icon">{item.icon}</div>
              <div style={{ display: sidebarOpen ? "block" : "none" }} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }

      </div>

    </div>
  );
};

export default Sidebar;