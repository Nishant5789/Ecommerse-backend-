const {User} = require('../model/user');
const crypto = require('crypto');
const { sanitizeUser } = require('../services/common');
const SECRET_KEY = 'SECRET_KEY';
const jwt = require('jsonwebtoken');
const { log } = require('console');

module.exports.creatUser = async (req, res)=>{
        // {
    //     "email":"user1@gmail.com",
    //     "password": "12345"
    //   }
    try {
        // const salt = crypto.randomBytes(16);
        // crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
        //     const user = new User({...req.body, password: hashedPassword, salt});
        //     const docs = await user.save();
        //     req.login(sanitizeUser(docs), (err)=>{
        //         if(err)
        //         {
        //             return res.status(400).json(err);
        //         }
        //         else{ 
        //             const token = jwt.sign(sanitizeUser(docs), SECRET_KEY);
        //             res.cookie("jwt", token, {expire: 360000 + Date.now(), httponly: true}); 
        //             return res.status(200).json(token);
        //         }
        //     });
        // })
        const user = new User({...req.body});
        const docs = await user.save();

        return res.status(200).json(docs);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

module.exports.loginUser = async (req, res, next)=>{  
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email});

        if(user == null) {
            return res.status(401).json({message: 'invalid credentials'});
        }
        if(user.password === password)
        {
            return res.status(201).json({id: user.id, email: user.email, name: user.name, addresses: user.addresses, });  
        }
        return res.status(401).json({message: 'invalid credentials'});
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
    // return res.cookie("jwt", req.user.token, {expire: 360000 + Date.now(), httponly: true}).status(201).json(req.user.token);
}
module.exports.checkUser = async (req, res, next)=>{
    
    // try {          
    //     // console.log("called");
    //     if (req.user) {
    //         return res.json({status:"success",user: req.user});
    //       } else {
    //         return res.status(401);
    //       }
    // } catch (error) {
    //     console.log(error);
    // }

    const {email, password} = req.body;

    // console.log(email, password);
    try {
        const user = await User.findOne({email: email});
        console.log(user);
        if(user == null) {
            return res.status(401).json({message: 'invalid credentials'});
        }
        if(user.password === password)
        {
            return res.status(201).json(user);  
        }
        return res.status(401).json({message: 'invalid credentials'});
    } catch (error) {
        console.log(error);
        return res.status(401).json(error);
    }

    
}
