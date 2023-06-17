const {  } = require('../controller/cart');
const { createOrder, deleteOrder, fetchOrderByUser } = require('../controller/order');
const router = require('express').Router();

router.post('/', createOrder);
router.delete('/:id', deleteOrder);
router.get('/:id', fetchOrderByUser);

module.exports = router;