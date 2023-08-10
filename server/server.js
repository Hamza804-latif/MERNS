const env = require("dotenv");
env.config();
const express = require("express");
const cors = require("cors");
const DatabaseConnection = require("./database/index.js");
const { registerModel, ProductModel } = require("./database/models.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

DatabaseConnection();

app.use(cors());
app.use(express.json({ limit: "30mb" }));

app.post("/register", async (req, resp) => {
  try {
    let checkEmail = await registerModel.findOne({ email: req.body.email });
    console.log(checkEmail);
    if (checkEmail) {
      return resp.json({ status: 401, msg: "User is Already exist" });
    } else {
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      await registerModel.create({
        image: req.body.image,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      return resp.json({ status: 200, msg: "Registered Successfully!" });
    }
  } catch (error) {
    console.log("error in register", error);
    resp.json({ status: 500, msg: "Internal Server Error" });
  }
});

app.post("/login", async (req, resp) => {
  let { email, password } = req.body;
  try {
    let emailCheck = await registerModel.findOne({ email }).select("-image");
    if (emailCheck) {
      let checkHashedPassword = await bcrypt.compare(
        password,
        emailCheck.password
      );

      if (checkHashedPassword) {
        jwt.sign(
          { id: emailCheck._id, name: emailCheck.name },
          process.env.JWT_TOKEN,
          { expiresIn: "1m" },
          (err, token) => {
            if (err) {
              return resp.json({ status: 500, msg: "Internal server Error" });
            }
            return resp.json({
              status: 200,
              msg: "Login Successfully",
              token,
            });
          }
        );
      } else {
        return resp.json({
          status: 401,
          msg: "email or password is incorrect",
        });
      }
    } else {
      return resp.json({ status: 401, msg: "email or password is incorrect" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/addproduct", async (req, resp) => {
  let { image, price, name, stock } = req.body;
  try {
    await ProductModel.create({ image, price, name, stock });
    resp.json({ status: 200, msg: "Product added Successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/allproducts", async (req, resp) => {
  try {
    let allproducts = await ProductModel.find({});
    resp.json({ status: 200, data: allproducts });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, resp) => {
  try {
    let deletedData = await ProductModel.deleteOne({ _id: req.params.id });
    if (deletedData?.deletedCount > 0) {
      return resp.json({ status: 200, msg: "Product Deleted successfully" });
    } else {
      return resp.json({ status: 404, msg: "Product Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/search", async (req, resp) => {
  try {
    let searchResult = await ProductModel.find({
      name: { $regex: req.query.query, $options: "i" },
    });
    resp.json({ status: 200, data: searchResult });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
