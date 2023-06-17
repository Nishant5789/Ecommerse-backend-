const {Cart} = require('../model/cart');

module.exports.addToCart = async (req, res)=>{
    try {
        const cart = new Cart(req.body);
        await cart.save();
        return res.status(201).json(cart);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    } 
}

module.exports.fetchCartByUser = async (req, res)=>{
    const {id} = req.params;
    try {
        const cart = await Cart.findOne({user: id}).populate("product").populate("user");
        return res.status(201).json(cart);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

module.exports.updateCart = async (req, res)=>{
    // {"quantity": 3}
    http://localhost:8080/
    try {
        const docs = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(docs);
    } catch (error) { 
        console.log(error);
        return res.status(400).json(error);
    }
}
module.exports.deleteFromCart = async (req, res)=>{
     // http://localhost:8080/order/:cartid 
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(201).json({});
    } catch (error) { 
        console.log(error);
        return res.status(400).json(error);
    }
}
