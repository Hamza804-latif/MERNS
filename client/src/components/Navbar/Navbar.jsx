import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  function Logout() {
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <div className="navbar-main">
      <div className="navbarContent">
        <h1>LOGO</h1>
        <div className="links">
          <Link to="/home">Home</Link>
          <Link to="/addproduct">Add Product</Link>
          <button onClick={Logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
