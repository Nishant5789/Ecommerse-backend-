const {Product} = require('../model/product')

module.exports.addProduct = async (req, res)=>{

    http://localhost:8080/products
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
module.exports.fetchProductById = async (req, res)=>{
    http://localhost:8080/:id
    try {
        console.log(req.params.id);
        const product = await Product.findById(req.params.id);
        // console.log(product);
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
module.exports.updateProduct = async (req, res)=>{
    http://localhost:8080/
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(product);
    } catch (error) { 
        console.log(error);
        return res.status(400).json(error);
    }
}
module.exports.fetchAllProducts = async (req, res)=>{

    /// url - http://localhost:8080/products?category=laptops&_sort=price&_order=desc&_page=2&_limit=2
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}  
    
    try {
        const condition = {};
        if(req.query.admin == null) 
        {  
            condition.deleted = {$ne: true};
        }

        let query = Product.find(condition);
        let totalProductsQuery = Product.find(condition);

        if(req.query.category){
            query = query.find({"category":req.query.category});
            totalProductsQuery = totalProductsQuery.find({"category":req.query.category});
        }
        if(req.query.brand){
            query = query.find({"brand":req.query.brand});
            totalProductsQuery = totalProductsQuery.find({"brand":req.query.brand});
        }
        if(req.query._sort && req.query._order){
            query = query.sort({[req.query._sort]: req.query._order});
            totalProductsQuery = totalProductsQuery.sort({[req.query._sort]: req.query._order});
        }

        const totalDocs = await totalProductsQuery.count().exec(); 
        console.log(totalDocs);
        res.set('X-Total-Count', totalDocs)

        if(req.query._page && req.query._limit){
            const page = req.query._page;
            const pageSize = req.query._limit;
            query = query.skip(pageSize*(page-1)).limit(pageSize);
        }

        const docs = await query.exec();
        // console.log(docs);
        res.status(201).json(docs);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}