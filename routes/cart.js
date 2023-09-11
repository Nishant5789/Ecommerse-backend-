const { fetchCartByUser, addToCart, deleteFromCart, updateCart, removeAllItemFromCart } = require('../controller/cart');
const router = require('express').Router();

router.get('/:id', fetchCartByUser);
router.post('/', addToCart);
router.delete('/:id', deleteFromCart);
router.delete('/removeAllitems/:userId', removeAllItemFromCart);
router.patch('/:id', updateCart);

module.exports = router;