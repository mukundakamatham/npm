const express = require('express');
const upload=require("../middlewares/file_upload")
const user=require("../models/user.model")
const router=express.Router()

router.post("/create",upload.single("profileImage"),async function (req,res){
    
    const product =await user.create({
        title: req.body.title,
        price:req.body.price,
        image_urls:req.file.path

    });
    console.log(req.body)
    
    return res.status(201).send(product)
})
router.patch("/update/:id",async function (req, res) {
    const item = await user.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();

    return res.status(200).send({item}); 
})
router.delete("/delete/:id", async function(res,req){
    const product=await user.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send({product});
    
})
module.exports=router;