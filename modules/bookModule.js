const mongooes = require('mongoose');

const booktable = new mongooes.Schema({
    departurePlace: {
        type: String,
        require: true,
    },
    arrivelPlace: {
        type: String,
        require: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    startTime: {  
        type: Date,
    },
    endTime: {
        type: Date,
    },
    travalType: {
        type: String,
        require: true,
    },
    noOfPersons: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    mobile: {
        type: String,
        require: true,
    },
    alternateNo: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    proof: {
        type: String,
        require: true,
    },
    paymentMethod: {
        type: String,
        require: true,
    },
    carNumber: {
        type: String,
        require: true,
    },

    status: { type: String },
    paymentStatus:{type:String},
    totalAmount:{type:Number},

});

module.exports = mongooes.model("carbook", booktable);