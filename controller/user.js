const { User } = require('../model/user');

module.exports.findUserById = async (req, res)=>{
    const {id} = req.params;
    try {
        const user = await User.findById(id, "name email id");
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