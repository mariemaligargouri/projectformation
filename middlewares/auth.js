const jwt = require("jsonwebtoken");

const config = require("config");
const doctor = require("../models/doctor");
const patient = require("../models/patient");

const secret = config.get("secret");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
      return res.status(401).json({msg : 'authorization denied'});
  }
  try {
    const decoded = jwt.verify(token, secret);
    const doc = await doctor.findById(decoded.id).select("-password");
    if (!doc) {
      return res.status(401).json([{ msg: "unauthorized" }]);
    } 
    else {
      req.doc = doc;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: error });
  };

  if (!token) {
      return res.status(401).json({msg : 'authorization denied'});
  }
  try {
    const decoded = jwt.verify(token, secret);
    const pat = await patient.findById(decoded.id).select("-password");
    if (!pat) {
      return res.status(401).json([{ msg: "unauthorized" }]);
    } 
    else {
      req.pat = pat;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = isAuth;