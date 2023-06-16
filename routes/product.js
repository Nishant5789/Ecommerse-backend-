const router = require('express').Router();
const {addProduct, fetchAllProducts} =  require('../controller/product')

router.post("/",  addProduct);
router.get("/",  fetchAllProducts);

module.exports = router;