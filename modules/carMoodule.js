const mongooes = require('mongoose');

const carTab = new mongooes.Schema({
    brandName: {
        type: String,
        require: true,
    },
    seater: {
        type: String,
        require: true,
    },
    fuelType: {
        type: String,
        require: true,
    },
    model: {
        type: String,
        require: true,
    },
    tollType: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    acOrNonAc: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true,
    },
    review: {
        type: String,
        require: true,
    },
    range: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    gearType: {
        type: String,
        require: true,
    },
    registrationNumber:{
        type:String,
        require:true,
    },
    star:{
        type:String,
        require:true,
    },
    uploadImage:{
        type:String,
        require:true,
    },

});

const cartab = mongooes.model("carstab", carTab);

module.exports = cartab