/* 3) შექმენით ფოლდერი სახელად router რომელშიც შექმნით ფაილს სახელად tours.router.js, შექმენით როუტერ ობიექტი და დაარეჰისტრირეთ 
ყვეკა ის მეთოდი რომელიც app ფაილში გქონდათ, დააქსპორტეთ როუტერი და use მეთოდის გამოყენებით დაარეგისტირრეთ მთავარ ფაილში */

const express = require('express');

const toursRouter = express.Router();

const tours = [];

// Tour consists id, name, price, duration

// Route to get all tours
toursRouter.get('/', (req, res) => {
    res.json(tours);
});

// Route to get tour by id
toursRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const tour = tours.find(elem => elem.id === parseInt(id));

    if(!tour) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Tour not found'
        })
    }

    res.json(tour);
});

// Route to add new tour
toursRouter.post('/', express.json(), (req, res) => {
    const { name, price, duration } = req.body;

    if(!name || !price || !duration) {
        return res.status(400).json({
            status: 'Fail',
            message: 'All fields required: name, price and duration'
        })
    }

    const newTour = {
        name,
        price,
        duration,
        id: Date.now()
    }

    tours.push(newTour);

    res.status(201).json(newTour);
});

// Route to update partially tour
toursRouter.patch('/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name, price, duration } = req.body;

    const index = tours.findIndex(elem => elem.id === parseInt(id));

    if(index === -1) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Tour not found'
        });
    }

    // Update only provided fields
    if (name !== undefined) tours[index].name = name;
    if (price !== undefined) tours[index].price = price;
    if (duration !== undefined) tours[index].duration = duration;

    res.json(tours[index]);
});

module.exports = toursRouter;