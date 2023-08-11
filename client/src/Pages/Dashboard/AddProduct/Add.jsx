import React, { useEffect, useState } from "react";
import ProductAvatar from "../../../assets/productAvatar.jpeg";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./add.css";

const Add = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const ConvertImageToString = (obj) => {
    if (obj.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(obj.target.files[0]);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  useEffect(() => {
    if (id) {
      getAll();
    }
  }, []);

  async function getAll() {
    try {
      let data = await fetch(`http://localhost:5000/product/${id}`);
      let json = await data.json();
      if (json.status === 200) {
        setImage(json.data.image);
        setName(json.data.name);
        setPrice(json.data.price);
        setStock(json.data.stock);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function Add() {
    if (image && price && name && stock) {
      let route = id ? `editproduct/${id}` : "addproduct";
      let res = await fetch(`http://localhost:5000/${route}`, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, price, name, stock }),
      });
      let jsonData = await res.json();
      if (jsonData.status === 200) {
        toast.success(jsonData.msg);
        navigate("/");
      }
    } else {
      toast.error("please fill all fields");
    }
  }
  return (
    <div className="addcontainer">
      <div className="register-form">
        <h1>{id ? "Edit" : "Add"} Product</h1>
        <label htmlFor="imgFile">
          <img src={image ? image : ProductAvatar} alt="" />
          <input
            type="file"
            id="imgFile"
            style={{ display: "none" }}
            onChange={(e) => ConvertImageToString(e)}
          />
        </label>

        <input
          type="text"
          placeholder="Enter Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Product Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button onClick={Add}>{id ? "Update" : "Add"}</button>
      </div>
    </div>
  );
};

export default Add;
