const express = require("express");

const app = express();
const CategoryRoute = require("./Routes/Categoryroutes");

app.use("/categories", CategoryRoute);

//error handler middlewares
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
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

app.listen(5000, () => {
  console.log("Server is starting on port 5000");
});
