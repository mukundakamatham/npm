const express=require('express')
const app=express();
app.use(express.json())


const user=require('./MOCK_DATA.json');
app.get("/",function (req,res) {
    res.send(user)
})

app.post("/books",function (req,res) {
   
  user.push(req.body)
  api_requested_by=req.query["req"]
  console.log("succesfully");
    res.send({api_requested_by,books:user})
})
app.get("/user",function (req,res) {
    res.send("succesfully post")
})
app.patch('/books/:id',validate({id:"required"}),function(req,res){
    api_requested_by=req.query["req"]
    user.some(el => {
        if(el.id==req.query["id"]){
          //  console.log(el)
        el.first_name=req.body["first_name"];
        el.publish_year=req.body["publish_year"]
        
            res.send({api_requested_by,book:el})
        }

});
})
app.delete('/books/:id',validate({id:"required"}),function(req,res){
    api_requested_by=req.query["req"]
    user.some(el => {
        if(el.id==req.query["id"]){
          //  console.log(el)
       /* delete el.id,
        delete el.first_name,
        delete el.title,
        delete el.paragraph,
        delete el.last_name;
        delete el*/
        Object.keys(el).forEach(function(key) { delete el[key]; });
        console.log("deleted");
        
            res.send({api_requested_by,book:user})
        }

});
})
app.get ('/books/:id',validate({id:"required"}), function (req,res) {
    user.some(el => {
        if(el.id==req.query["id"]){
          //  console.log(el)
        
            res.send(el)
        }
    }); 

   })
   function validate(data) {
       return function(req,res,next){
           Object.keys(data).forEach(function (item) {
               if(! req.query[item]){
                   res.send(`pls add ${item} in the url`)
               }   
           })
           next();
       }
   }



   app.listen(3000 ,function() {
    console.log('Server is listening on port 3000')
});


/*
function logger(req,res,next) {
    console.log("starting");
    next()
    console.log("finished");
}*/

function id(data) {
    user.some(el => {
 if(el.id==data){
    // console.log(el)
     return  el;
 
 }
    });
}