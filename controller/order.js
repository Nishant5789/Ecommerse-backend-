const {Order} = require('../model/order');

module.exports.fetchOrderByUser = async (req, res)=>{
    const {id} = req.params;
    try {
        const docs = await Order.findOne({user: id}).populate("items").populate("user");
        return res.status(201).json(docs);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
module.exports.createOrder = async (req, res)=>{
    try {
        const order = new Order(req.body);
        await order.save()
        return res.status(201).json(order);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
module.exports.deleteOrder = async (req, res)=>{
    // http://localhost:8080/order/:orderid 
    try {
        await Order.findByIdAndDelete(req.params.id)
        .catch(error=> console.log(error));
        return res.status(201).json({});
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
