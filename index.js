const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');
const brandsRoute = require('./routes/brands');

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

const startApp = async () => {
    await connectDB();
    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send("connected");
    });

    app.use('/products', productRoute);
    app.use('/category', categoryRoute);
    app.use('/brands', brandsRoute);

    app.listen(process.env.SERVER_PORT, ()=>{
        console.log(`listening on port  ${process.env.SERVER_PORT}`);
    })
}

startApp();

