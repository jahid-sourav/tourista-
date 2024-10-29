import Loading from "@/components/custom-components/Loading";
import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="py-5">
        <Loading size={60} color="green" />
      </div>
    );
  }

  if (user?.emailVerified) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
