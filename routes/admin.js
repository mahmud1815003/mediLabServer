//External Imports
const express = require("express");
const { roles, roleResult } = require("../controller/Roles/roleValidator");
const { adminSignInCheck, adminResult, createJWT } = require("../controller/admin/signin");
const {uploadFile} = require('../middlewares/upload');
const { adminFileCheck, adminFileResult, fileUpload } = require("../controller/admin/upload");
const { doctorSignUpCheck, doctorResult, addDoctor, getDoctors, getAppoint, appointmentList, setAppointment, appointmentPatientList } = require("../controller/admin/addDoctor");
const adminRouter = express.Router();

adminRouter.post('/login', roles, roleResult, adminSignInCheck, adminResult, createJWT);
adminRouter.post('/upload', uploadFile, adminFileCheck, adminFileResult, fileUpload);
adminRouter.post('/add', doctorSignUpCheck, doctorResult, addDoctor);
adminRouter.get('/doctors', getDoctors);
adminRouter.get('/list', appointmentList);
adminRouter.post('/patientlist', appointmentPatientList);
adminRouter.post('/apoint', getAppoint);
adminRouter.post('/setapoint', setAppointment);



module.exports = {
  adminRouter,
};
