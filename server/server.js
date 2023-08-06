const express = require("express");
const cors = require("cors");
const DatabaseConnection = require("./database/index.js");
const { registerModel } = require("./database/models.js");

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
      await registerModel.create({
        image: req.body.image,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      return resp.json({ status: 200, msg: "Registered Successfully!" });
    }
  } catch (error) {
    console.log("error in register", error);
    resp.json({ status: 500, msg: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
