const express = require('express');

const router = express.Router();

const coach = require("../models/coach.model")

const authenticate = require('../middlewares/authenticate')

router.post("/create",async function (req, res) {
       const item = await coach.create(req.body );
    
       return res.status(200).send({item}); 
    })
    router.get("/",async function (req, res) {
        const item = await coach.find( ).lean().exec();
     
        return res.status(200).send({item}); 
     })
module.exports = router;
