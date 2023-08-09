import React, { useEffect, useState } from "react";
import "./home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    GetAllProducts();
  }, []);

  async function GetAllProducts() {
    try {
      let res = await fetch("http://localhost:5000/allproducts");
      let jsonData = await res.json();
      if (jsonData.status === 200) {
        setProducts(jsonData?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="table">
      <table border="1px">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item?.image} alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td className="tableBtns">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
