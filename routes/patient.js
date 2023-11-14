//External Imports
const express = require("express");
const { patientResult, patientSignUpCheck, addPaitent } = require("../controller/patient/addPatient");
const { patientSignInCheck, createJWT } = require("../controller/patient/login");
const { sendFiles } = require("../controller/patient/sendFile");
const patientRouter = express.Router();


patientRouter.post("/add",patientSignUpCheck, patientResult, addPaitent);
patientRouter.post("/login", patientSignInCheck, patientResult, createJWT);
patientRouter.post("/:type", sendFiles);

module.exports = {
  patientRouter,
};
