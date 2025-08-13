const express = require('express');

const app = express();

// 1) link parameters
// 2) query
// 3) body

const tours = [
    { id: 3, name: 'Snow Adventurer', price: 997, duration: 4 },
    { id: 1, name: 'Forest Hiker', price: 397, duration: 5 },
    { id: 4, name: 'City Wanderer', price: 1197, duration: 9 },
    { id: 2, name: 'Sea Explorer', price: 497, duration: 7 },
    { id: 5, name: 'Park Camper', price: 1497, duration: 10 }
];

app.get('/tours', (req, res) => {
    const { sort } = req.query;

    const copiedTours = [...tours];

    // sort = price : asc
    // sort = -price : desc

    // 1) დაამატეთ სორტირების კიდევ ერთი საშუალება დროის მიხედვით დალაგება ზრდადობით ან კლებადობით

    if(sort === 'price') {
        copiedTours.sort((a, b) => a.price - b.price);
    } else if(sort === '-price') {
        copiedTours.sort((a, b) => b.price - a.price);
    } else if(sort === 'duration'){
        copiedTours.sort((a, b) => a.duration - b.duration);
    } else if(sort === '-duration'){
        copiedTours.sort((a, b) => b.duration - a.duration);
    }

    res.json(copiedTours);
});

app.get('/tours/:id', (req, res) => {
    const { id } = req.params;

    /* 2) დამატეთ ერთი როუტე რომელსაც გადაეცემა პარამეტრი ID და დააბრუნეთ ერთი კონკრეტული პარამეტრი, თუ პარტამეტრით ვერ მოიძებნა ტური დააბრუნეთ 
    404 სტატუსის კოდი და ერორის ობიექტი რომელშიც გექნებათ 2 კუთვნილება status და message */

    const index = tours.findIndex(tour => tour.id === parseInt(id));

    if(index === -1){
        return res.status(404).json({
            status: "Fail",
            message: "Tour not found"
        });
    }

    res.json(tours[index]);
});


app.listen(3000, () => {
    console.log('Server is runing on port 3000');
});