const mongoose = require('mongoose');
const productSchema=new mongoose.Schema({
   userid:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:false},
    image_urls:[{type:String ,required:true}]
})
const product=mongoose.model('Product',productSchema);
module.exports = product;