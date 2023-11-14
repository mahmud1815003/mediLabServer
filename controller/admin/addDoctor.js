const { check, validationResult } = require("express-validator");
const moment = require("moment");
const { doctorModel } = require("../../models/doctor");
const { counterModel } = require("../../models/counter");
const bcrypt = require("bcrypt");
const { PatientModel } = require("../../models/PatientMode");
const { appointmentModel } = require("../../models/appointment");

const doctorSignUpCheck = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("Please Enter Your Name")
    .trim(),
  check("email").isEmail().withMessage("Enter a valid Email"),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Enter a Valid Bangladeshi Phone Number Ex: +880")
    .trim(),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Enter a password with atleast length of 5")
    .trim(),
  check("gender").custom((value) => {
    const ara = ["male", "female", "other"];
    if (ara.indexOf(value) == -1) {
      throw Error("Enter valid gender");
    }
    return true;
  }),
  check("date").custom((value) => {
    const isOk = moment().diff(value, "years", false);
    if (isOk < 0) {
      throw Error("Enter a Valid Date of Birth");
    }
    return true;
  }),
];

const doctorResult = (req, res, next) => {
  try {
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    if (Object.keys(mappedError).length > 0) {
      res.status(400).json(mappedError);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const addDoctor = async (req, res) => {
  try {
    const user = await doctorModel.find({ email: req.body.email });
    const pass = await bcrypt.hash(req.body.password, 10);
    const counter = await counterModel.find({});
    console.log(counter[0]);
    if (user?.length > 0) {
      res.status(400).json({
        email: {
          msg: "This Email Exists",
        },
      });
    } else {
      const newData = new doctorModel({
        ...req.body,
        password: pass,
        doctorId: counter[0].doctorCounter + 1,
      });
      await counterModel.updateOne(
        { _id: counter[0]._id },
        {
          doctorCounter: counter[0].doctorCounter + 1,
          patientCounter: counter[0].patientCounter,
        }
      );
      await newData.save();
      res.status(201).json({
        msg: "Doctor Added",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getDoctors = async (req, res) => {
  try {
    const user = await doctorModel.find({}).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getAppoint = async (req, res) => {
  try {
    const user = await PatientModel.find({ email: req.body.email });
    if (user?.length == 0) {
      res.status(400).json({
        email: {
          msg: "Can not find the user",
        },
      });
    } else {
      console.log(req.body);
      const newModel = new appointmentModel({
        email: req.body.email,
        doctorId: req.body.doctor.doctorId,
        doctorName: req.body.doctor.name,
        approved: false,
        pending: true,
        reject: false,
      });
      await newModel.save();
      res.status(201).json({
        msg: "Appointment Added",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
const appointmentList = async (req, res) => {
  try {
    const user = await appointmentModel.find({pending: true, approved: false, reject: false});
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
const appointmentPatientList = async (req, res) => {
  try {
    console.log(req.body);
    const user = await appointmentModel.find({email: req.body.email});
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
const setAppointment = async (req, res) => {
  try {
    await appointmentModel.updateOne(
      { _id: req.body.id },
      {
        [req.body.prop]: true,
      }
    );
    res.status(201).json({
      msg: "Done Appointment",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  addDoctor,
  doctorResult,
  doctorSignUpCheck,
  getDoctors,
  getAppoint,
  appointmentList,
  setAppointment,
  appointmentPatientList,
};
