const {Category} = require('../model/category');


module.exports.fetchCategory = async (req, res)=>{

    
}
module.exports.createCategory = async (req, res)=>{
    
    try {
        const category = new Category(req.body);
        await category.save();
    
        return res.status(201).json(category);
    } catch (error) {
        console.log(error);
    }
}