const {Brand} = require('../model/brand');

module.exports.fetchBrands = async (req, res)=>{
    try {
        const brandsdocs = await Brand.find({});
        return res.status(200).json(brandsdocs);
    } catch (err) {
        console.log(err);
        return res.status(400).json(error);
    }
}

module.exports.createBrand = async (req, res)=>{
    try {
        const category = await Brand(req.body);
        await category.save()
        .catch(err=>console.log(err));
    
        return res.status(201).json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }

}