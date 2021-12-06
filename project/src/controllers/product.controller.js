const express = require('express');

const router = express.Router();

const Product = require("../models/product.model")

const authenticate = require('../middlewares/authenticate')
//const authorize = require('../middlewares/authorize');


router.post("",async function (req,res){
    const tags=req.body.map(file=>file.tags)
    const product =await lectur.create({
        title: req.body.title,
        tags:tags,
        
        video_url:req.body.video_url
    });
    //console.log(req.body)
    
    return res.status(201).send(product)
})
router.get("/suggestions", authenticate, async function(req, res) {
    tag=req.user.map(file=>file.intrests)
    const products = await Product.find({ tags: { $all: tag } }).lean().exec();
   

    return res.send({products})
})

module.exports = router;