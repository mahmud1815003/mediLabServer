const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  try {
    const isOk = await jwt.verify(req.body.token, process.env.salt);
    console.log(isOk);
    if (isOk) {
      res.status(200).json({
        ok: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
    });
  }
};

module.exports = {
    verify,
}
