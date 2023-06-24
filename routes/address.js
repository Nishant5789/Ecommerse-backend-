const { addUserAddress, removeUserAddresses, updateUserAddresses, fetchAddressesByUser } = require('../controller/address');
const router = require('express').Router();

router.post("/:user", addUserAddress);
router.get("/:user", fetchAddressesByUser);
router.delete("/:id", removeUserAddresses);
router.patch("/:id", updateUserAddresses);

module.exports = router;