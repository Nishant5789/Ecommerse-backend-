const { Address } = require("../model/address");

module.exports.addUserAddress = async (req, res)=>{
    const {id:user} = req.user;
    try {
        const address = new Address({...req.body, user});
        console.log(address);
        await address.save();
        return res.status(201).json(address);
    } catch (error) { 
        console.log(error);
        return res.status(400).json(error);
    }
}
module.exports.fetchAddressesByUser = async (req, res)=>{
    const {id:user} = req.user;
    try {
        const addressDocs = await Address.find({user});
        return res.status(201).json(addressDocs);
    } catch (error) { 
        console.log(error);
        return res.status(400).json(error);
    }
}
module.exports.removeUserAddresses = async (req, res)=>{
    const {id} = req.params;
    try {
        await Address.findByIdAndDelete(id);
        return res.status(201).json({});
    } catch (error) { 
        console.log(error);
        return res.status(400).json(error);
    }
}
module.exports.updateUserAddresses = async (req, res)=>{
    // {
    //     "city": "pardi"
    //   }
    const {id} = req.params;
    try {
        const updateAddressdocs = await Address.findByIdAndUpdate(id, req.body, {new: true});
        return res.status(201).json(updateAddressdocs);
    } catch (error) { 
        console.log(error);
        return res.status(400).json(error);
    }
}