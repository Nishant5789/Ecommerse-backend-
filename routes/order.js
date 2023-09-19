const {  } = require('../controller/cart');
const { createOrder, deleteOrder, fetchOrderByUser, fetchAllOrder, updateOrder } = require('../controller/order');
const router = require('express').Router();

router.post('/', createOrder);
router.delete('/:orderId', deleteOrder);
router.get('/user', fetchOrderByUser);
router.get('/', fetchAllOrder);
router.patch('/:orderId', updateOrder);

module.exports = router;