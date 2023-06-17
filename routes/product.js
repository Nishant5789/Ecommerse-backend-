const router = require('express').Router();
const {addProduct, fetchAllProducts, fetchProductById, updateProduct} =  require('../controller/product')

router.post("/",  addProduct);
router.get("/",  fetchAllProducts);
router.get("/:id",  fetchProductById);
router.patch("/:id",  updateProduct);

module.exports = router;