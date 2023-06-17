const { creatUser, loginUser } = require('../controller/auth');
const router = require('express').Router();

router.post("/signup",  creatUser);
router.post("/login",  loginUser);

module.exports = router;