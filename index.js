const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const carsRoute=require('./routes/CarRoutes');

const cors = require('cors'); // Import the cors package
const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

app.use('/api', userRoute);

app.use('/cars',carsRoute);

const dbUrl = 'mongodb://localhost:27017/Vrental';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('Connection failed', error));

app.listen(2000, () => {
    console.log('Server is running on port 2000');
});
