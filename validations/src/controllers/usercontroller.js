const express = require('express');
// const upload=require("../middlewares/file_upload")
const { body, validationResult } = require('express-validator');
const user=require("../models/user.model")
const router=express.Router()
//console.log(body("author"))
router.post("/create",body('email').isEmail(),body('pincode').isNumeric().isLength({ min: 6,max:6 }),
body("age").isNumeric().custom((value)=>{

    if(value<0||value>100){
      throw new Error('age must be 0 to 100 ') }
    return true;
}),body("first_name").notEmpty(),body("last_name").notEmpty(),
body("gender").custom((value)=>{

    if(value!=("Male"||"Female"||"Others")){
      throw new Error('gender must be Male or Female or Others') }
    return true;
}),
async function (req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const product =await user.create({
        first_name: req.body.first_name,
        last_name:req.body.last_name,
                email:req.body.email,
                age:req.body.age,
                pincode:req.body.pincode,
                gender:req.body.gender


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