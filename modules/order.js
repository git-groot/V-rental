const mongooes=require('mongoose');

const orderSchema=new mongooes.Schema({
    name:{type:String},
    carName:{type:String},
    startDate:{type:Date},
    endDate:{type:Date},
    status:{type:String},
});

module.exports=mongooes.model("order",orderSchema);