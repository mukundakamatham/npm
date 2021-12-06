const express = require('express');
const upload=require("../middlewares/file_upload")
const Product=require("../models/user.model")
const Products=require("../models/product.model")

const router=express.Router()


// router.post("/single",upload.single("profileImage"),async function (req,res){
    
//     const product =await Product.create({
//         title: req.body.title,
//         price:req.body.price,
//         image_urls:req.file.path

//     });
//     console.log(req.body)
    
//     return res.status(201).send(product)
// })
router.post("/multiple/:id",upload.array('productImages',5),async function (req,res){
    const filePaths=req.files.map(file=>file.path)
    

    const product=await Products.create({
       userid:req.params.id,
        image_urls: filePaths
    })
    return res.status(201).send(product)
})
router.delete("/delete/:id", async function(res,req){
    const product=await Products.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send({product});
    
})
module.exports=router;