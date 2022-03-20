const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fuelRoutes = require("./routes/fuel-routes");
const userRoutes = require("./routes/users-routes");
const app = express();
const HttpError = require("./models/http-error");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

//middleware
app.use("/api/fuelquote", fuelRoutes); // api/fuelquote/...
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Route not found", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://tbarnett281:Gibson123!@cluster0.9d5cx.mongodb.net/quotes?retryWrites=true&w=majority"
  )
  .then(() => {
    let server = app.listen(5000);
    module.exports = server;
  })
  .catch((err) => {
    console.log(err);
  });

