const { multerUploader } = require("../util/uploader");
const uploadFile = (req, res, next) => {
  const upload = multerUploader(
    ["application/dicom", "application/octet-stream"],
    1024 * 1024 * 150
  );
  upload.any()(req, res, (error) => {
    if (error) {
      console.log(error.message);
      res.status(400).json({
        file: {
          msg: error.message,
        },
      });
    } else {
      if (req.files.length === 0) {
        res.status(400).json({
          file: {
            msg: "Please Select a file",
          },
        });
      } else {
        next();
      }
    }
  });
};

module.exports = {
  uploadFile,
};