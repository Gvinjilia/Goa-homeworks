/* 1) შექმენით express სერვერი, რომელიც უსმენს მოთხოვნებს პორეტ 3000სზე თქვენი დავალებაა, შექმნათ თავიდან მასივი რომელშიც იქნება 5 მანქანა მოცემული, დაარეგისტრირეთ 
როუტე GET /cars რომელიც დააბრუნებს ყველა მანქანას json ფორმატში, შემდეგ დაარეგისტრირეთ GET /cars/:id როუტე, დასერჩეთ ექსპრესში როგორ გამოიყენოთ პარამეტრები, 
შესწავლის შემდეგ მასივიდან აირჩიეთ ის მანქანა რომელიც ემთხვევა გადმოცემულ პარამეტრს, გატესტეთ postman გამოყენებით თქვენი შექმენილი express ის API */

/* 2) შექმენით express სერვერი, რომელიც უსმენს მოთხოვნებს პორეტ 3000სზე თქვენი დავალებაა, შექმნათ თავიდან მასივი რომელშიც იქნება 5 მანქანა მოცემული, დაარეგისტრირეთ 
როუტე GET /cars რომელიც დააბრუნებს ყველა მანქანას json ფორმატში, შემდეგ დაარეგისტრირეთ GET /cars/:id როუტე, დასერჩეთ ექსპრესში როგორ გამოიყენოთ პარამეტრები, 
შესწავლის შემდეგ მასივიდან აირჩიეთ ის მანქანა რომელიც ემთხვევა გადმოცემულ პარამეტრს და დააბრუნეთ json ფორმატში, დაამატეთ DELETE /cars/:id როუტე რომლითაც მასივიდან 
წაშლით ობიექტს და დააბრუნებთ წაშლილ ობიექტს შესაბამისი სტატუსის კოდით და საბოლოოდ შექმენით POST /cars როუტე რომლითაც დაამატებთ ახალ მანქანას მასივში ID 
ავტოიმატურად უნდა ემატებოდეს და შექმენის შემდეგ დააბრუნებთ ახალ მანქანის ობიექტს json ფომატში, მოიძიეთ იუნფორმაცია midlleware  შესახებ და რას აკეთებს express.json 
ახსენით კომენტარებით, გატესტეთ postman გამოყენებით თქვენი შექმენილი express ის API */

const express = require('express');

const cars = [
    {
        "id":1,
        "brand":"Toyota",
        "model":"Corolla",
        "year":2022,
        "description":"Reliable and fuel-efficient sedan, perfect for daily driving."
    },
    {
        "id":2,
        "brand":"Tesla",
        "model":"Model 3",
        "year":2023,
        "description":"All-electric car with advanced autopilot and minimalistic design."
    },
    {
        "id":4,
        "brand":"Ford",
        "model":"Mustang",
        "year":2020,"description":"Classic American muscle car with powerful V8 engine."
    },
    {
        "id":5,
        "brand":"Honda",
        "model":"Civic",
        "year":2022,
        "description":"Compact car known for reliability and affordability."
    },
]

const app = express();

app.get('/cars', (req, res) => {
    res.json(cars);
});

app.get('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const findCar = cars.find(car => car.id === id);

    if(!findCar){
        return res.status(404).json({
            status: '404 Fail',
            message: 'Error'
        })
    }

    res.json(findCar);
});

app.delete('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const carIndex = cars.findIndex(car => car.id === id);

    cars.splice(carIndex, 1);

    res.status(204).send();
});

app.post('/cars/:id', (req, res) => {
    const {brand, model} = req.body;

    const car = {
        brand,
        model,
        id: cars[car.length - 1].id + 1
    };

    cars.push(car);

    res.status(201).json(car);
});

// express.json() - ჩვენ გვეხმარება JSON - ის ფორმატში გამოგზავნილი მონაცემების წაკითხვაში

app.listen(3000, () => {
    console.log('The server is running on port 3000');
});