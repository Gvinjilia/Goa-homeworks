const express = require('express');
const fs = require('fs');

const app = express();

const cars = fs.readFileSync('cars.json', 'utf-8');

app.get('/cars', (req, res) => {
    const data = JSON.parse(cars);

    res.json(data);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});