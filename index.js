const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const carsRoute = require('./routes/CarRoutes');
const carbooking = require('./routes/bookRoutes');
const adminRouts = require('./routes/adminRoute');
const path = require('path');

const cors = require('cors'); 
const app = express();

app.use(cors()); 
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userRoute);
app.use('/cars', carsRoute);
app.use('/booking', carbooking);
app.use('/admin', adminRouts);

const dbUrl = 'mongodb://localhost:27017/Vrental';

mongoose.connect(dbUrl)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('Connection failed', error));

app.listen(2000, () => {
    console.log('Server is running on port 2000');
});
