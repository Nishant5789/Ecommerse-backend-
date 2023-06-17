const { fetchCartByUser, addToCart, deleteFromCart, updateCart } = require('../controller/cart');
const router = require('express').Router();

router.get('/:id', fetchCartByUser);
router.post('/', addToCart);
router.delete('/:id', deleteFromCart);
router.patch('/:id', updateCart);

module.exports = router;