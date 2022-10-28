require('dotenv').config();
const connectdb = require('./db/connect');
const Product = require("./models/product");

const productList = require("./products.json");

connectdb(process.env.MONGO_URI)
    .then(result=>{
        Product.deleteMany().then(result=>{
            Product.create(productList)
            .then(result =>{
                process.exit(0);
            })
            .catch(error=>{
                console.log(error);
            });
        });

    })
    .catch(error=>{
        console.log(error);
    })