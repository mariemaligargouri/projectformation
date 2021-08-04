const express = require ('express');
const { register, getUser } = require('../controllers/patient.controller');
const {login} = require ('../controllers/patient.controller');
const isAuth = require ('../middlewares/auth');
const { registerRules } = require('../middlewares/validator');
// const {validator}=require('../middlewares/validator');
const Router = express.Router();
Router.post('/registerPat', registerRules(), register);
Router.post('/loginPat', login);
Router.get('/authPat', isAuth, getUser)

module.exports = Router;