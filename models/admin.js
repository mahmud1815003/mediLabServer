// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const adminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});


//Model

const adminModel = mongoose.model('Admin', adminSchema);


module.exports = {
    adminModel,
}