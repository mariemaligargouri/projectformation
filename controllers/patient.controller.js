const patient = require('../models/patient');
const bc = require ('bcryptjs');
const config = require("config");
const secret = config.get("secret");
const jwt = require("jsonwebtoken");


exports.register = async(req, res) => {
 const  {fullName, birthday, email, phone, entryDate, fileNumber, observations, bloodGroup, doctorsName, role, password} = req.body;
try {
    const existantPatient = await patient.findOne({email});
    if (existantPatient) return res.status(401).json({ msg: "patient already exists" });
    let newPatient = new patient({
        fullName,
        birthday,
        phone,
        email,
        entryDate,
        fileNumber,
        observations,
        bloodGroup,
        doctorsName,
        role,
        password
    });
    const salt = await bc.genSalt(10);
    const hash = await bc.hash(password, salt);
    newPatient.password = hash;

    await newPatient.save();
    res.status(201).json(newPatient);
    const payload = {
      id: newPatient._id,
    };
    const token = jwt.sign(payload, secret);
    res.send({
      token,
      patient: {
        _id: newPatient._id,
        fullName: newPatient.fullName,
        birthday: newPatient.birthday,
        email: newPatient.email,
        phone: newPatient.phone,
        entryDate: newPatient.entryDate,
        fileNumber: newPatient.fileNumber,
        observations: newPatient.observations,
        bloodGroup: newPatient.bloodGroup,
        doctorsName: newPatient.doctorsName,
        role : newPatient.role,
        password: newPatient.password
      },
    });
  }  catch (error) {
      res.status(500).json({ errors: error.message });
       }};

    exports.login = async (req, res) => {
      const {email, password} = req.body;
      try {
        const existantPatient = await patient.findOne({ email });
        if (!existantPatient) return res.status(401).json({ msg: "Bad credentials!!" });
        let isMatch = await bc.compare(password, existantPatient.password);
        if (!isMatch) return res.status(401).json({ msg: "Bad credentials!!" });
        const payload = {
          id: existantPatient._id,
        };
        const token = jwt.sign(payload, secret);
        res.send({
          token,
          patient: {
            _id: existantPatient._id,
            name: existantPatient.name,
            email: existantPatient.email,
            role : existantPatient.role
          },
        }); 
      }
       catch (error) {
    res.status(500).json({ errors: error });
     }};
     exports.getUser = (req,res) => {
      res.send(req.patient)
    }