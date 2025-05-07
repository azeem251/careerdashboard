import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const ProtectedRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
        navigate("/login");  // Redirect to login page if not authenticated
    }
}, [navigate]);
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  // If authenticated, render the child routes; otherwise, redirect to login
  return isAuthenticated === 'true' ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
