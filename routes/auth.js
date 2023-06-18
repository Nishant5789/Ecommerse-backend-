const passport = require('passport');
const { creatUser, loginUser, checkUser } = require('../controller/auth');
const router = require('express').Router();

router.post("/signup",  creatUser);
router.post("/login",  passport.authenticate("local"), loginUser);
router.get("/check",  checkUser); 

module.exports = router;