const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();

const app = express();
const CategoryRoute = require("./routes/category-routes");
const RecipeRoute = require("./routes/recipe-routes");

//Initialize DB
require("./initDB")();

//Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
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
