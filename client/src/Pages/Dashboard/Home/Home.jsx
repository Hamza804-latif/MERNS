import React, { useEffect, useState } from "react";
import "./home.css";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    GetAllProducts();
  }, []);

  async function GetAllProducts() {
    let token = JSON.parse(localStorage.getItem("userToken"));
    try {
      setIsLoading(true);
      let res = await fetch("http://localhost:5000/allproducts", {
        headers: {
          auth: `bearer ${token}`,
        },
      });
      let jsonData = await res.json();
      setIsLoading(false);
      if (jsonData.status === 200) {
        setProducts(jsonData?.data);
      } else {
        toast.error(jsonData?.msg);
        if (jsonData?.login === false) {
          localStorage.removeItem("userToken");
          navigate("/login");
        }
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  }

  async function Delete(id) {
    let token = JSON.parse(localStorage.getItem("userToken"));

    try {
      setIsLoading(true);
      let res = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
        headers: {
          auth: `bearer ${token}`,
        },
      });
      let json = await res.json();
      setIsLoading(false);

      if (json?.status === 200) {
        toast.success(json?.msg);
        GetAllProducts();
      } else {
        toast.error(json?.msg);
        if (json?.login === false) {
          localStorage.removeItem("userToken");
          navigate("/login");
        }
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  }

  async function Search(e) {
    let token = JSON.parse(localStorage.getItem("userToken"));

    try {
      setIsLoading(true);

      let res = await fetch(
        `http://localhost:5000/search/?query=${e.target.value}`,
        {
          headers: {
            auth: `bearer ${token}`,
          },
        }
      );
      let json = await res.json();
      setIsLoading(false);
      if (json.status === 200) {
        setProducts(json.data);
      } else {
        toast.error(json?.msg);
        if (json?.login === false) {
          localStorage.removeItem("userToken");
          navigate("/login");
        }
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  }

  function Edit(id) {
    navigate(`/editproduct/${id}`);
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
                        <button onClick={() => Edit(item?._id)}>Edit</button>
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
