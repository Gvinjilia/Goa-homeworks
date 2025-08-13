const express = require('express');
const carsRouter = require('./router/cars.router');

const app = express();

app.use('/cars', carsRouter);

app.listen(3000, () => {
    console.log('The server is running on port 3000');
});