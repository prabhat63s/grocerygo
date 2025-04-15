import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectIfAuthenticated = ({ children }) => {
  const { user } = useAuth();

  // If the user is logged in, redirect to home or any other route
  if (user) {
    return <Navigate to="/admin/home" replace />;
  }

  // If the user is not logged in, render the children (e.g., Login page)
  return children;
};

export default RedirectIfAuthenticated;
