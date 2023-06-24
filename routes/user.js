const {findUserById, updateUser, addUserAddress, fetchUserAddresses} = require('../controller/user');
const router = require('express').Router();

router.get("/:id", findUserById);
router.post("/:id", updateUser);


module.exports = router;