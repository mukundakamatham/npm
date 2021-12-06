const express = require('express');

const connect= require('./configs/db');
const userController = require('./controllers/users.controller');
const postController = require('./controllers/post.controller');
const commentController = require('./controllers/comments.controller');
const tagController = require('./controllers/tag.controller');



const app=express();

app.use(express.json())


app.listen(3000,async function(){
    await connect();
    console.log("listening on port 3000");
})