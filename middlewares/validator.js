
const {check, validationResult }= require ('express-validator');
exports.registerRules = () => [
  check("fullName", "this field is required").notEmpty(),
  check("email", "this field is required").notEmpty(),
  check("birthday", "this field is required").notEmpty(),
  check("entryDate", "this field is required").notEmpty(),
  check("fileNumber", "this field is required").notEmpty(),
  check("bloodGroup", "this field is required").notEmpty(),
  check("doctorsName", "this field is required").notEmpty(),
  check("login", "this field is required").notEmpty(),
  check("speciality", "this field is required").notEmpty(),
  check("phone", "this field is required").notEmpty(),
  check("email", "this field should be a valid email").isEmail(),
  check("password", "this field should be at least 8 characters").isLength({min: 8,}),
];

exports.validator = (req, res, next) => {
    const errors = validationResult (req)
    errors.isEmpty() ? next () : res.status(400).json({msg:errors.array()})
}

