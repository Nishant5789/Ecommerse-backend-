const router = require('express').Router();
const {fetchBrands, createBrand} =  require('../controller/brand')

router.get('/', fetchBrands);
router.post('/', createBrand);

module.exports = router;