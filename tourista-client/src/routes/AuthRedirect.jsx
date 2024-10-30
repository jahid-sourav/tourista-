import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router";

const AuthRedirect = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

AuthRedirect.propTypes = {
  children: PropTypes.node,
};

export default AuthRedirect;
