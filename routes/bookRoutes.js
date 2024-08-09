const bookControle = require('../controller/bookingController');
const express = require('express');
const route = express.Router();

route.post('/add/booking',bookControle.addbook);

route.get('/getall/booking',bookControle.getallbooking);

route.get('/getsingle/booking/:id',bookControle.getsinglebook);


module.exports=route;
