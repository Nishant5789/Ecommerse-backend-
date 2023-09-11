const {Cart} = require('../model/cart');
const ObjectId = require('mongodb').ObjectId;

module.exports.addToCart = async (req, res)=>{

    const {product, user} = req.body;
    try {
        const exitingProduct = await Cart.findOne({product, user});
        // console.log(exitingProduct);
        if(exitingProduct != null){
            return res.status(201).json({"msg": "Product already exists"});
        }
        else{
            const cart = new Cart(req.body);
            await cart.save();
            return res.status(201).json(cart);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    } 
}

module.exports.fetchCartByUser = async (req, res)=>{
    const {id} = req.params;
    // const {id} = req.user; for authenticated
    try {
        const cart = await Cart.find({user: id}).populate("product");
        console.log(cart);
        return res.status(201).json(cart);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

module.exports.updateCart = async (req, res)=>{
    // {"quantity": 3}
    http://localhost:8080/
    // console.log(req.params.id, req.body);
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

module.exports.removeAllItemFromCart = async (req, res) => {
    // http://localhost:8080/order/removeAllitems/:userid ;

    const userId = req.params.userId;
    try {
        await Cart.deleteMany({ user: userId })
        res.status(201).json({});
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
