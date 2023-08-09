import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  let activeStyle = { color: "coral" };
  function Logout() {
    console.log("dadshjk");
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <div className="navbar-main">
      <div className="navbarContent">
        <h1>LOGO</h1>
        <div className="links">
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/addproduct"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Add Product
          </NavLink>
          <button onClick={Logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
