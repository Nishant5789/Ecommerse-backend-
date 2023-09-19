const { fetchCartByUser, addToCart, deleteFromCart, updateCart, removeAllItemFromCart } = require('../controller/cart');
const router = require('express').Router();

router.get('/', fetchCartByUser);
router.post('/', addToCart);
router.delete('/:id', deleteFromCart);
router.post('/removeAllitems', removeAllItemFromCart);
router.patch('/:id', updateCart);

module.exports = router;