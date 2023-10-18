const passport = require('passport');
const { creatUser, loginUser, checkUser, logout } = require('../controller/auth');
const router = require('express').Router();


router.post("/signup",  creatUser); 
router.post("/login",  passport.authenticate("local"), loginUser); 
router.get("/check",  passport.authenticate("jwt"), checkUser); 
router.get("/logout",   logout); 

module.exports = router; 