const express = require('express');

const router = express.Router();

const User = require("../models/user.model")

const authenticate = require('../middlewares/authenticate')

router.patch("/update",authenticate,async function (req, res) {
       const item = await User.findByIdAndUpdate(req.user.id, req.body, {new: true}).lean().exec();
    
       return res.status(200).send({item}); 
    })
module.exports = router;
