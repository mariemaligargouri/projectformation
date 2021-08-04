const mongoose = require("mongoose");
const patientSchema = mongoose.Schema ({
idPatient : String,
fullName: String,
birthday : String,
phone : String,
email :String,
entryDate :{
    type: Date,
    default: Date.now,
  },
fileNumber : String,
observations : String,
bloodGroup : String,
doctorsName : String,
userRole :{
  type : String,
  role :['patient'],
  },
password : String,
});
module.exports = mongoose.model ('patient', patientSchema);