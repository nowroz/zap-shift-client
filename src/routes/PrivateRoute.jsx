import { Navigate, useLocation } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return children;
  }

  return (
    <Navigate to="/login" state={{ redirection: location.pathname }}></Navigate>
  );
};

export default PrivateRoute;
