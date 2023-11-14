// Job Guru Server
// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const counterSchema = mongoose.Schema({
    patientCounter: {
        type: Number,
        default: 0,
    },
    doctorCounter: {
        type: Number,
        default: 0,
    }
});


//Model

const counterModel = mongoose.model('Counter', counterSchema);


module.exports = {
    counterModel,
}