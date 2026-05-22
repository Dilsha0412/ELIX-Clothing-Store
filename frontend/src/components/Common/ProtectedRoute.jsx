import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="text-center py-10">Loading auth state...</div>;
  }

  console.log("Protected Route - Logged User:", user);
  console.log("Protected Route - Required Role:", role);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
    console.warn(`Access denied! User role is '${user.role}', but required is '${role}'`);
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default ProtectedRoute;