const express = require ('express');
const { register, getUser } = require('../controllers/doctor.controller');
const {login} = require ('../controllers/doctor.controller');
const isAuth = require('../middlewares/auth');

const { registerRules} = require('../middlewares/validator');
// const {validator}=require('../middlewares/validator');

const Router = express.Router();
Router.post('/registerDoc',registerRules(), register );
Router.post('/loginDoc', login);
Router.get('/authDoc', isAuth, getUser)

module.exports = Router;