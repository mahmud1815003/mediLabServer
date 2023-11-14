const { check, validationResult } = require("express-validator");
const { PatientModel } = require("../../models/PatientMode");
const { jwtCreator } = require("../../util/TokenCreator");
const bcrypt = require("bcrypt");

const patientSignInCheck = [
  check("email")
    .isEmail()
    .withMessage("Enter a valid Email")
    .custom(async (value) => {
      const user = await PatientModel.find({ email: value });
      if (user.length == 0) {
        throw Error("User Does not exist");
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

const createJWT = async (req, res, next) => {
  try {
    const user = await PatientModel.find({ email: req.body.email });
    const isOk = await bcrypt.compare(req.body.password, user[0].password);
    if (isOk) {
      const admin = {
        email: req.body.email,
        role: "patient",
        name: user[0].name,
        patientId: user[0].patientId,
      };
      const token = jwtCreator(admin);
      res.status(200).json({
        user: admin,
        token: token,
      });
    } else {
      res.status(400).json({
        password: {
          msg: "Password does not match",
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      password: {
        msg: "Password does not match",
      },
    });
  }
};

module.exports = {
  patientSignInCheck,
  patientResult,
  createJWT,
};
