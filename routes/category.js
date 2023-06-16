const router = require('express').Router();
const {fetchCategory, createCategory} =  require('../controller/category')

router.get("/",  fetchCategory);
router.post("/",  createCategory);

module.exports = router;