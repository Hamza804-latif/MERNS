import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function Login() {
    if (email && password) {
      setLoading(true);
      try {
        let result = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        let jsonData = await result.json();
        setLoading(false);
        if (jsonData.status === 200) {
          toast.success(jsonData.msg);
          navigate("/home");
        } else {
          toast.error(jsonData.msg);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      toast.error("Please fill all fields");
    }
  }
  return (
    <div className="register">
      <div className="register-form">
        <h1>{isLoading ? "Loading..." : "Login"}</h1>
        <input
          type="text"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={Login}>Login</button>
        <span>
          Don't have an account? <Link to="/register">Signup</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
