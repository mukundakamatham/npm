const express=require('express')
const app=express()
app.use(logger)
const users=require('./MOCK_DATA.json')
app.get("/",function (req,res) {
    res.send("Welcome to Home page")
})

app.post("/user",function (req,res) {
    console.log("during reqs",users)
    res.send(users)
})

app.get("/user",function (req,res) {
    res.send(users)
})

function logger(req,res,next) {
    console.log("beforereq");
    next()
    console.log("after req");
}



app.listen(2345,function(){
console.log("PORT 2345")
}) 