
const express=require('express')
const app=express()
const connect = require("./configs/db");


app.use(express.json());




const userControllers = require('./controllers/userController.js');

app.use("/users",userControllers);



app.listen(2345, async function () {
    await connect();
    console.log("listening on port 2345");
});