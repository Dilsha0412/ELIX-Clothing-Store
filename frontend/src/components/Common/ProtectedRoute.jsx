import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  const savedToken = 
    localStorage.getItem("userToken") || 
    localStorage.getItem("token") || 
    localStorage.getItem("auth_token");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading auth state...</p>
      </div>
    );
  }

  console.log("Protected Route - Logged User:", user);
  console.log("Protected Route - Required Role:", role);
  console.log("Protected Route - Token Exists:", !!savedToken);

  if (!user && !savedToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user && user.role?.toLowerCase() !== role.toLowerCase()) {
    console.warn(`Access denied! User role is '${user.role}', but required is '${role}'`);
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default ProtectedRoute;