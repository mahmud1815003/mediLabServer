// Job Guru Server
// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const appointmentSchema = mongoose.Schema({
    email: String,
    doctorId: Number,
    doctorName: String,
    approved: Boolean,
    pending: Boolean,
    reject: Boolean,
},
{ timestamps: true });


//Model

const appointmentModel = mongoose.model('Appointment', appointmentSchema);


module.exports = {
    appointmentModel,
}