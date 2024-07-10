
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ isLoggedIn, children }) => {

  return isLoggedIn ? children : <Navigate to="/" />;
}

PrivateRoutes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;