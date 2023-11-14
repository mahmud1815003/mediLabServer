const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
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
    patientId: Number,
    birthDay: Date,
    gender: String,
  },
  { timestamps: true }
);

const PatientModel = mongoose.model("Patient", patientSchema);

module.exports = { PatientModel };
