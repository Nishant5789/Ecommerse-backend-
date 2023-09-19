const { User } = require('../model/user');
const { Address } = require('../model/address');

module.exports.findUserById = async (req, res)=>{
    const {id} = req.user;
    console.log(id);
    try {
        const user = await User.findById(id, "name email id");
        return res.status(201).json(user);
    } catch (error) { 
        console.log(error);
        return res.status(400).json(error);
    }
}

module.exports.findUserDataById = async (req, res)=>{
    const {id} = req.user;
    try {
        const user = await User.findById(id);
        return res.status(201).json(user);
    } catch (error) { 
        console.log(error);
        return res.status(400).json(error);
    }
}




module.exports.updateUser = async (req, res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(user);
    } catch (error) { 
        console.log(error);
        return res.status(400).json(error);
    }
}