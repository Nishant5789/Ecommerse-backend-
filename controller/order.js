const {Order} = require('../model/order');

module.exports.fetchOrderByUser = async (req, res)=>{
    const {userId} = req.params;
    try {
        const docs = await Order.find({user: userId}).populate("items").populate("user").populate("selectedAddress");
        console.log(docs);
        return res.status(201).json(docs);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

module.exports.updateOrder = async (req, res)=>{
    const {orderId} = req.params;
    try {
        const upatedDocs = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
        // console.log(upatedDocs);
        return res.status(201).json(upatedDocs);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

module.exports.fetchAllOrder = async (req, res)=>{

    http://localhost:8080/order?_sort=totalAmount&_order=asc&_admin=true
    try {  
        let query =  Order.find({deleted: {$ne: true}});
        let totalOrdersQuery =  Order.find({deleted: {$ne: true}});

        if(req.query._sort && req.query._order){
            query = query.sort({[req.query._sort]: req.query._order});
            totalOrdersQuery = totalOrdersQuery.sort({[req.query._sort]: req.query._order});
        }

        const totalDocs = await totalOrdersQuery.count().exec(); 
        console.log(totalDocs);
        res.set('X-Total-Count', totalDocs)

        if(req.query._page && req.query._limit){
            const page = req.query._page;
            const pageSize = req.query._limit;
            query = query.skip(pageSize*(page-1)).limit(pageSize);
        }

        query = query.populate("items").populate("user").populate("selectedAddress");
        
        const docs = await query.exec();
        console.log(docs);
        res.status(201).json(docs);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

module.exports.createOrder = async (req, res)=>{
    // {
    //     "items": ["648dbb70d2ebd1b1455464b3"],
    //     "totalAmount": 700,
    //     "totalItems": 1,
    //     "user": "648d6af31a181df43848f424",
    //     "paymentMode": "CASH",
    //     "selectedAddress": "64956049fba1a19f14db425a"
    //   }

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
        await Order.findByIdAndDelete(req.params.orderId)
        // .catch(error=> console.log(error));
        return res.status(201).json({});
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
