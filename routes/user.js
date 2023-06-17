const {findUserById, updateUser} = require('../controller/user');
const router = require('express').Router();

router.get("/:id",  findUserById);
router.post("/:id",  updateUser);

module.exports = router;