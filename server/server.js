const express = require("express");

const app = express();

app.use((req, resp, next) => {
  console.log("middleware is called");
  next();
});

app.get("/data", (req, resp) => {
  resp.json("route is working");
});

app.get("/data2", (req, resp) => {
  resp.json("route 2 is working");
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
