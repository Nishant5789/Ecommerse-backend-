const {  } = require('../controller/cart');
const { createOrder, deleteOrder, fetchOrderByUser, fetchAllOrder, updateOrder } = require('../controller/order');
const router = require('express').Router();

router.post('/', createOrder);
router.delete('/:id', deleteOrder);
router.get('/:id', fetchOrderByUser);
router.get('/', fetchAllOrder);
router.patch('/:id', updateOrder);

module.exports = router;