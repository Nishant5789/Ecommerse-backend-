const {Category} = require('../model/category');


module.exports.fetchCategory = async (req, res)=>{
    try {
        const categorydocs = await Category.find({});

        return res.status(200).json(categorydocs);
    } catch (err) {
        console.log(err);
        return res.status(400).json(error);
    }
}
module.exports.createCategory = async (req, res)=>{
    
    try {
        const category = new Category(req.body);
        await category.save();
    
        return res.status(201).json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}