const express = require('express');
const app=express();
app.use(express.json());
const productController = require("./controllers/product.controller")
const userController=require("./controllers/usercontroller.js")
app.use('/product',productController);
app.use('/user',userController);
module.exports = app;