const doctor = require("../models/doctor");
const bcrypt = require("bcryptjs");
const config = require("config");
const secret = config.get("secret");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  const { name, email, speciality, phone, password, role } = req.body;
  try {
    const existantDoctor = await doctor.findOne({email});
    if (existantDoctor) return res.status(401).json({ msg: "doctor already exists" });
    const newDoctor = new doctor({
      name,
      email,
      speciality,
      phone,
      password,
      role
    });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    newDoctor.password = hash;
    
    await newDoctor.save();
    console.log(newDoctor)
    res.status(201).json(newDoctor);
    const payload = {
      id: newDoctor._id,
    };
    const token = jwt.sign(payload, secret);
    res.send({
      token,
      doctor: {
        _id: newDoctor._id,
        name: newDoctor.name,
        email: newDoctor.email,
        speciality: newDoctor.speciality,
        phone: newDoctor.phone,
        password: newDoctor.password,
        role : newDoctor.role
      },
    });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

exports.login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const existantDoctor = await doctor.findOne({ email });
    if (!existantDoctor) return res.status(401).json({ msg: "Bad credentials!!" });
    let isMatch = await bcrypt.compare(password, existantDoctor.password);
    if (!isMatch) return res.status(401).json({ msg: "Bad credentials!!" });
    const payload = {
      id: existantDoctor._id,
    };
    const token = jwt.sign(payload, secret);
    res.send({
      token,
      doctor: {
        _id: existantDoctor._id,
        name: existantDoctor.name,
        email: existantDoctor.email,
        role : existantDoctor.role
      },
    });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};
exports.getUser = (req,res) => {
  res.send(req.doctor)
}

