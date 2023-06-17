const {User} = require('../model/user');

module.exports.creatUser = async (req, res)=>{
        // {
    //     "email":"user1@gmail.com",
    //     "password": "12345"
    //   }
    try {
        const user = new User(req.body);
        await user.save();
        return res.status(201).json(user);  
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

module.exports.loginUser = async (req, res)=>{

    // {
    //     "email":"user1@gmail.com",
    //     "password": "12345"
    //   }
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
}
