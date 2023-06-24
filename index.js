const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


require('dotenv').config();

const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');
const brandsRoute = require('./routes/brands');
const authRoute = require('./routes/auth');
const cartRoute = require('./routes/cart');
const userRoute = require('./routes/user');
const addressRoute = require('./routes/address');
const orderRoute = require('./routes/order');

const {User} = require('./model/user');
const { sanitizeUser, isAuth, cookieExtractor } = require('./services/common');


const SECRET_KEY = 'SECRET_KEY';
// jwt options 
var opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};


// middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));
app.use(cookieParser());
app.use(passport.authenticate('session'));
app.use(express.json());
app.use(cors({
    exposedHeaders:['X-Total-Count']
}));

app.get('/', (req, res) => {
    res.send("connected");
});

app.use('/products', productRoute);
app.use('/category', categoryRoute);
app.use('/brands', brandsRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/address',addressRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
// app.use('/products',isAuth(), productRoute);
// app.use('/category',isAuth(), categoryRoute);
// app.use('/brands',isAuth(), brandsRoute);
// app.use('/auth', authRoute);
// app.use('/user',isAuth(), userRoute);
// app.use('/cart',isAuth(), cartRoute);
// app.use('/order',isAuth(), orderRoute);

passport.use(new LocalStrategy(
    {usernameField: 'email'} ,
    async function(email, password, done) {
        try {
            const user = await User.findOne({email: email});
            if(user == null) {
                // done(iserror, isautorised, error message)
                return done(null, false, {message: 'invalid credentials'});
            }
            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                return done(null, false, {message: 'invalid credentials'});
            }
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
            return done(null,{token}); // this line send to serliser 
            }); 
        } catch (error) {
            console.log(error);
            done(error)
            // return res.status(400).json(error);
        }    
    }
));

passport.use('jwt',new JwtStrategy(opts, async function(jwt_payload, done) {
    console.log(jwt_payload);
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
            return done(null, sanitizeUser(user));
        } else {
            return done(null, false);
        }
    } catch (error) {
        if (err) {
            return done(err, false);
        }
    }
    }));


// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
process.nextTick(function () {
    // console.log("serialize", user);
  return cb(null, user);  
});
});

// this changes session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
process.nextTick(function () {
    // console.log("deserialize", user);
  return cb(null, user);
});
});



app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`listening on port  ${process.env.SERVER_PORT}`);
})
const startApp = async () => {
    await connectDB();
}
startApp();

