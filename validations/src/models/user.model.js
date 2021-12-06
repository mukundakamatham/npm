const mongoose = require('mongoose');

// step 1 :- create the schema for user
const userSchema = new mongoose.Schema({
  
    first_name: {type: String, required: true},
    last_name: {type: String, required: false},
    age:{type:Number,required:true},
    pincode:{type:Number,required:true},
    gender:{type:String,required:true},
    email:{type:String,required:true}
    
})

// step 2 :- connect the schema to the users collection
const User = mongoose.model("user", userSchema); // users

module.exports = User;