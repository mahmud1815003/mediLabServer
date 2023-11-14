// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const fileSchema = mongoose.Schema({
    path: String,
    patientId: String,
    type: String,
}, { timestamps: true });


//Model

const fileModel = mongoose.model('File', fileSchema);


module.exports = {
    fileModel,
}