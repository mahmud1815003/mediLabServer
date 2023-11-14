const { check, validationResult } = require("express-validator");
const { adminModel } = require("../../models/admin");
const { jwtCreator } = require("../../util/TokenCreator");

const adminSignInCheck = [
  check("email")
    .isEmail()
    .withMessage("Enter a valid Email")
    .custom(async (value) => {
      const user = await adminModel.find({ email: value });
      if (user.length == 0) {
        throw Error("User Does not exist");
      }
      return true;
    }),
];

const adminResult = (req, res, next) => {
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

const createJWT = async (req,res,next) => {
    try{
        const user = await adminModel.find({email: req.body.email});
        if(user[0].password == req.body.password){
            const admin = {
                email: req.body.email,
                role: 'admin',
            };
            const token = jwtCreator(admin);
            res.status(200).json({
                user: admin,
                token: token,
            })
        }else{
            res.status(400).json({
                password: {
                    msg: 'Password does not match',
                }
            })
        }
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg: error,
        })
    }
}

module.exports = {
  adminSignInCheck,
  adminResult,
  createJWT,
};
