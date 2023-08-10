import React, { useEffect, useState } from "react";
import "./home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GetAllProducts();
  }, []);

  async function GetAllProducts() {
    try {
      setIsLoading(true);
      let res = await fetch("http://localhost:5000/allproducts");
      let jsonData = await res.json();
      setIsLoading(false);
      if (jsonData.status === 200) {
        setProducts(jsonData?.data);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  }

  async function Delete(id) {
    try {
      setIsLoading(true);
      let res = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });
      let json = await res.json();
      setIsLoading(false);

      if (json?.status === 200) {
        toast.success(json?.msg);
        GetAllProducts();
      } else {
        toast.error(json?.msg);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  }

  async function Search(e) {
    try {
      setIsLoading(true);

      let res = await fetch(
        `http://localhost:5000/search/?query=${e.target.value}`
      );
      let json = await res.json();
      setIsLoading(false);

      if (json.status === 200) {
        setProducts(json.data);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  }

  return (
    <div className="table">
      <div className="searchmain">
        <input
          type="text"
          placeholder="Search"
          className="search"
          onChange={(e) => Search(e)}
        />
      </div>
      {!isLoading ? (
        <>
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
              {products.length !== 0 ? (
                products.map((item) => {
                  return (
                    <tr key={item?._id}>
                      <td>
                        <img src={item?.image} alt="" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.stock}</td>
                      <td className="tableBtns">
                        <button>Edit</button>
                        <button onClick={() => Delete(item?._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5}>
                    <b>Products not found</b>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <h1 style={{ margin: "100px auto", width: "fit-content" }}>
          Loading...
        </h1>
      )}
    </div>
  );
};

export default Home;
