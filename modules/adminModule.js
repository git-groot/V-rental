const mongooes=require('mongoose');

const adminTab=new mongooes.Schema({
    adminId:{
        type:String,
    },
    password:{
        type:String,
    },
    companyName:{
        type:String,
    },
    email:{
        type:String,
    },
    contactNO:{
        type:String,
    },
    location:{
        type:String,
    },
    ownerName:{
        type:String,
    },
    adminProfile:{
        type:String,
    },

});

module.exports=mongooes.model('admin',adminTab);