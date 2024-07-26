const mongooes = require('mongoose');

const userTab = new mongooes.Schema({
    fName: {
        type: String,
        required:true,
    },
    lName:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    
});

const userlist=mongooes.model("user",userTab);

module.exports=userlist;