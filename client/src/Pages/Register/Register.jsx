import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ConvertImageToString = (obj) => {
    if (obj.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(obj.target.files[0]);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  const Signup = async () => {
    if (image && name && email && password) {
      let data = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, name, email, password }),
      };
      let result = await fetch("http://localhost:5000/register", data);
      let josnData = await result.json();
      console.log(josnData);
    } else {
      toast.error("Please fill all fields");
    }
  };
  return (
    <div className="register">
      <div className="register-form">
        <h1>Signup</h1>
        <input type="file" onChange={(e) => ConvertImageToString(e)} />
        <input
          type="text"
          placeholder="Enter Your name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={Signup}>Sign up</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
