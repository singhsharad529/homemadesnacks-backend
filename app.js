const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const path = require("path");
const CategoryRoute = require("./routes/category-routes");
const RecipeRoute = require("./routes/recipe-routes");
const ImageRoute = require("./routes/image-route");

//Initialize DB
require("./initDB")();

// set the view engine to ejs
app.set("view engine", "ejs");

//Middleware for parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static Middleware
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/image-upload", ImageRoute);
app.use("/categories", CategoryRoute);
app.use("/recipes", RecipeRoute);

//error handler middlewares
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;
//server listening on 5000 port
app.listen(PORT, () => {
  console.log("Server is starting on port ", PORT);
});
