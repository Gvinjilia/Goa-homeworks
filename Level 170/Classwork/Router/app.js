/* 3) შექმენით ფოლდერი სახელად router რომელშიც შექმნით ფაილს სახელად tours.router.js, შექმენით როუტერ ობიექტი და დაარეჰისტრირეთ ყვეკა 
ის მეთოდი რომელიც app ფაილში გქონდათ, დააქსპორტეთ როუტერი და use მეთოდის გამოყენებით დაარეგისტირრეთ მთავარ ფაილში */

const express = require('express');
const toursRouter = require('./router/tours.router');

const app = express();

app.use('/tours', toursRouter);

app.listen(3000, () => {
    console.log('Server is runing on port 3000');
});