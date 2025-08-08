const express = require('express');

const app = express();

const tours = [];

app.get('/tours', (req, res) => {
    res.json(tours);
});

app.patch('/tours/:id', express.json(), (req, res) => {
    const {id} = req.params;
    const {name, maxGroupSize, price} = req.body;

    const index = tours.findIndex(tour => tour.id === parseInt(id));

    if(index === -1){
      return res.status(404).json({
        status: 'Fail',
        message: 'Tour not found'
      })
    };

    if (name !== undefined){
      tours[index].name = name;
    }

    if (price !== undefined){
      tours[index].price = price;
    }

    if (maxGroupSize !== undefined){
      tours[index].maxGroupSize = maxGroupSize;
    }

    res.json(tours[index]);
});

app.post('/tours', express.json(), (req, res) => {
    const {name, maxGroupSize, price} = req.body;

    if(!name || !maxGroupSize || !price){
      return res.status(404).json({
        status: "Fail",
        message: "All fields are required"
      })
    };

    const newTour = {
        name: name,
        maxGroupSize: maxGroupSize,
        price: price,
        id: Date.now()
    }

    tours.push(newTour);

    res.status(201).json(newTour);
});

app.delete('/tours/:id', (req, res) => {
    const {id} = req.params;

    const index = tours.findIndex(tour => tour.id === parseInt(id));

    if(index === -1){
        return res.status(404).json({
            status: "Fail",
            message: "Tour not found"
        })
    };

    tours.splice(index, 1);

    res.status(204).json();
});

// Middleware - არის ფუნქცია რომელსაც აქვს წვდომა ორ ობიექტზე req, res, ის ჩვენ გვეხმარება იმაში რომ მომხმარებლის მიერ შემოტანილი მნიშვნელობები შევამოწმოთ და
// საბოლოოდ დავუბრუნოთ

app.listen(3000, () => {
    console.log('The server is running on port 3000');
});