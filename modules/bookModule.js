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
        type: String,
    },
    endDate: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
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

});

module.exports = mongooes.model("carbook", booktable);