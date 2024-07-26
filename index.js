
const express = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');
const userRout = require('./routes/userRoute')


const app = express();

app.use(bodyParser.json());

app.use('/api',userRout);


const dburl = 'mongodb://localhost:27017/Vrental';

mongooes.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => console.log('mongo connect sucessfully'))
    .catch((error) => console.error('connection failed', error));


app.listen(2000, () => {
    console.log('server is running on port 2000');
})