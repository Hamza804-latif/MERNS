import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="register">
      <div className="register-form">
        <h1>Login</h1>
        <input type="text" placeholder="Enter Your Email" />
        <input type="password" placeholder="Enter Your Password" />
        <button>Login</button>
        <span>
          Don't have an account? <Link to="/register">Signup</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
