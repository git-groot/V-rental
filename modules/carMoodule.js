const mongooes = require('mongoose');

const carTab = new mongooes.Schema({
    name: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    seats: {
        type: String,
        require: true,
    },
    kmsIncluded: {
        type: String,
        require: true,
    },
    farePerKm: {
        type: String,
        require: true,
    },
    fuelType: {
        type: String,
        require: true,
    },
    cancellationPolicy: {
        type: String,
        require: true,
    },
    baseFare: {
        type: String,
        require: true,
    },
    discount: {
        type: String,
        require: true,
    },
    rating: {
        type: String,
        require: true,
    },
    ratingsCount: {
        type: String,
        require: true,
    },
    carImage: {
        type: String,
        require: true,
    },

});

const cartab = mongooes.model("cars", carTab);

module.exports = cartab