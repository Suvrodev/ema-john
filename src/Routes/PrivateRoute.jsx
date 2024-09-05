import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, dbUser, loading, baseUrl } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <h1 className="text-xl font-bold">Loading...</h1>
        <progress className="progress w-56 bg-green-400 text-green-400"></progress>
      </div>
    );
  }

  console.log("Current DB user================[PR] ", dbUser?.role);
  if (user && dbUser?.role == "admin") {
    // if (user && user.email == "suvrodevhowlader1408@gmail.com") {
    return children;
  }

  return <Navigate to="/admin" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
