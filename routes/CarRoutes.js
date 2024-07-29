const express =require('express');
const carController=require('../controller/carController');
const route =express.Router();

route.post('/add/cars',carController.addcars);

route.get('/getall/car',carController.getCars);

route.get('/getsingle/:id',carController.getCarById);

route.delete('/delete/:id',carController.deleteCar);

route.put('/update/:id',carController.updateCar);


module.exports=route