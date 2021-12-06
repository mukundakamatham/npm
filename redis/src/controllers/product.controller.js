const express = require('express');
const router=express.Router();
const product=require("../models/product.model");
const redis=require("../configs/redis")
router.get("", (req,res)=>{


    redis.get("products",async function (err,products){

   if(err)console.log(err);
    
    if(products)return res.status(200).send(JSON.parse(products));
    
    const Product=await product.find().len().exec();

redis.set("products",JSON.stringify(Product))

  return  res.status(200).send(Product)
 })

})
router.post("", async (req,res)=>{
    const Product=await product.create(req.body)
    
    const Products=await product.find().lean().exec();
    
redis.set("products",JSON.stringify(Products))
return res.status(201).send(Product)
})

router.get("/:id", (req,res)=>{


    redis.get(`products.${req.params.id}`,async function (err,products){

   if(err)console.log(err);
    
    if(products)return res.status(200).send(JSON.parse(products));
    
    const Product=await product.findById(req.params.id).lean().exec();

redis.set(`products.${req.params.id}`,JSON.stringify(Product))

  return  res.status(200).send(Product)
 })

})
router.patch("/:id",async (req,res)=>{



    const Product=await product.findByIdAndUpdate(req.params.id,req.body).lean().exec();
  
  
redis.set(`products.${req.params.id}`,JSON.stringify(Product))

  return  res.status(200).send(Product)
 })

 router.delete("/:id",async (req,res)=>{



    const Product=await product.findByIdAndDelete(req.params.id).lean().exec();
  
redis.del(`products.${req.params.id}`)
  
const Products=await product.find().lean().exec();
redis.set(`products`,JSON.stringify(Products))

  return  res.status(200).send(Product) 
 })
module.exports=router;