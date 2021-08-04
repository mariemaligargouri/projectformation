const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema ({
idDoctor : String,
name : String,
email : String,
phone : String,
speciality : String,
password : String,
userRole :{
type : String,
role :['doctor'],
},
idPatient : String,
});
module.exports = mongoose.model ('doctor', doctorSchema);