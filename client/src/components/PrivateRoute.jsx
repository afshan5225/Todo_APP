import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from "../context/AppContext.jsx";

const PrivateRoute = () => {
  const { isLoggedIn, loading } = useAppContext(); 

  if (loading) return <div className="text-center mt-20">Loading...</div>;  

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />; 
};

export default PrivateRoute;
