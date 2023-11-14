// Medilab Website
// Jaied Bin Mahmud
// KUET BME '18

//External Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require('morgan');
const path = require('path');

//Internal Imports
const {notFound, errorHandler} = require('./controller/error/error');
const { patientRouter } = require("./routes/patient");
const {adminRouter} = require('./routes/admin');
const { verify } = require("./util/verifyjwt");

//Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join('public')));


//Routers
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello from BME Team",
  });
});

app.use('/patient', patientRouter);
app.use('/admin', adminRouter);
app.use('/verify', verify);


//Error Handlers
app.use(notFound);
app.use(errorHandler);

//Connections
const port = process.env.port || 5000;
const mongoDB = process.env.mongo_link;

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(port, () => {
      console.log("Server is Running");
    });
  })
  .catch((error) => {
    console.log("Database connection failed");
    console.log(error);
  });