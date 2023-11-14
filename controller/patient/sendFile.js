const { fileModel } = require("../../models/file");
const jwt = require("jsonwebtoken");

const sendFiles = async (req,res,next) => {
  try {
    const isOk = await jwt.verify(req.headers.authorization, process.env.salt);
    if(isOk){
        const data = await fileModel.find({patientId: req.body.user.patientId, type: req.body.type});
        res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'Not Verified',
    })
  }
};

module.exports = {
  sendFiles,
}
