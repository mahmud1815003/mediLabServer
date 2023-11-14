const { check, validationResult } = require("express-validator");

const roles = [
  check("role").custom((value) => {
    const ara = ["patient", "doctor", "admin"];
    if (ara.indexOf(value) == -1) {
      throw Error("Enter a valid Role");
    }
    return true;
  }),
];

const roleResult = (req, res, next) => {
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

module.exports = {
    roleResult,
    roles,
}
