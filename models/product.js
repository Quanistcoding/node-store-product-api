const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  featured:{
    type:Boolean,
    default:false
},
  name:{
    type:String,
    required:[true,'product name must be provided']
  },
  price:{
    type:Number,
    required:[true,'product price name must be provided']
  },
  rating:{
    type:Number,
    default:4.5
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  company:{
    type:String,
    enum:{
        values:["ikea","liddy","caressa","marcos"],
        message:"{value} is not supported"
     }
    }
}
)

const Products = mongoose.model("Product",schema)

module.exports = Products;