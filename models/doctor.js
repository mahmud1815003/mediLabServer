// Job Guru Server
// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require("mongoose");

//Schema

const doctorSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    doctorId: Number,
    birthDay: Date,
    gender: String,
  },
  { timestamps: true }
);

//Model

const doctorModel = mongoose.model("Doctor", doctorSchema);

module.exports = {
  doctorModel,
};
