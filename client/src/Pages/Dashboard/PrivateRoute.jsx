import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const PrivateRoute = () => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("userToken"))
  );

  return (
    <>
      {token ? (
        <div>
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
