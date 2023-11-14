const { check, validationResult } = require("express-validator");
const moment = require("moment");
const { PatientModel } = require("../../models/PatientMode");
const {counterModel} = require('../../models/counter');
const bcrypt = require('bcrypt');

const patientSignUpCheck = [
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

const patientResult = (req, res, next) => {
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

const addPaitent = async (req, res) => {
  try {
    const user = await PatientModel.find({ email: req.body.email });
    const pass = await bcrypt.hash(req.body.password,10);
    const counter = await counterModel.find({});
    console.log(counter[0]);
    if(user?.length > 0){
      res.status(400).json({
        email: {
          msg: 'This Email Exists',
        }
      })
    }else{
      const newData = new PatientModel({
        ...req.body,
        password: pass,
        patientId: counter[0].patientCounter+1,
      });
      await counterModel.updateOne({_id: counter[0]._id}, {
        doctorCounter: counter[0].doctorCounter,
        patientCounter: counter[0].patientCounter+1,
      });
      await newData.save();
      res.status(201).json({
        msg: 'Patient Added',
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  patientSignUpCheck,
  patientResult,
  addPaitent
};
