const {findUserById, updateUser, addUserAddress, fetchUserAddresses, findUserDataById} = require('../controller/user');
const router = require('express').Router();

router.get("/own", findUserById);
// router.get("/getuserdata/:id", findUserDataById);
router.post("/:id", updateUser);

module.exports = router;