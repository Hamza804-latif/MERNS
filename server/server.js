const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb" }));

app.post("/register", (req, resp) => {
  console.log(req.body);
  resp.json("register route works");
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
