import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import { useEffect, useState } from 'react';
import ForgotPassword from './Components/ForgotPassword';
import DashboardLayout from './Components/Layout/DashboardLayout';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Category from './Pages/Category';
import Dashboard from './Pages/Dashboard';
import Payments from './Pages/Payments';
import PrivateRoutes from "./Pages/PrivateRoutes";
import Reports from './Pages/Reports';
import SliderImages from './Pages/SliderImages';
import Vendors from './Pages/Vendors';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local storage for login status on initial render
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedLoggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route element={<DashboardLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
          <Route path="/dashboard" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Dashboard /></PrivateRoutes>} />
          <Route path="/vendors" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Vendors /></PrivateRoutes>} />
          <Route path="/reports" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Reports /></PrivateRoutes>} />
          <Route path="/sliderimages" element={<PrivateRoutes isLoggedIn={isLoggedIn}><SliderImages /></PrivateRoutes>} />
          <Route path="/category" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Category /></PrivateRoutes>} />
          <Route path="/payments" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Payments /></PrivateRoutes>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
