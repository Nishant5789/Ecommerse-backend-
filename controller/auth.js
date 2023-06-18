const {User} = require('../model/user');
const crypto = require('crypto');
const { sanitizeUser } = require('../services/common');

module.exports.creatUser = async (req, res)=>{
        // {
    //     "email":"user1@gmail.com",
    //     "password": "12345"
    //   }
    try {
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
            const user = new User({...req.body, password: hashedPassword, salt});
            const docs = await user.save();
            return res.status(201).json(sanitizeUser(docs));  
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}


module.exports.loginUser = async (req, res, next)=>{
    return res.status(201).json({status: "sucess"});
}
module.exports.checkUser = async (req, res, next)=>{
    try {
        // console.log("called");
        if (req.user) {
            return res.json(req.user);
          } else {
            return res.status(401);
          }
    } catch (error) {
        console.log(error);
    }
    
}
