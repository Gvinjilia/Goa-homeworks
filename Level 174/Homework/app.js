const express = require('express');
const morgan = require('morgan');
const hotelRouter = require('./routers/hotel.router');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/hotels', hotelRouter);

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// development - ნიშნავს იმას რომ პროექტი ჯერ კიდევ პროცესშია
// production - ნიშნავს იმას რომ პროექტი უკვე დამთავრებულია

// morgan - ი არის ერთ - ერთი middleware ფუნქცია რომელიც გვიბრუნებს ინფორმაციას მოთხოვნების შესახებ

// .env - ფაილს ჩვენ ვიყენებთ გარემოს ცვლადების შესანახად ჩვენ მასში ძირითადად ვინახავთ ისეთ ინფორმაციას როგორიცაა PORT PASSWORD და ასე შემდეგ
// .gitignore - ფაილს ჩვენ ვიყენებთ იმისათვის რომ მასში ჩავწეროთ ისეთი ფაილების ან folder - ების სახელები რომლებიც არ გვინდა რომ ავტივირთოთ git - ზე

// require('dotenv').config(); - ის გამოყენებით ჩვენ შეგვიძლია .env ფაილში არსებული გარემოს ცვლადების წაკითხვა, წაკითხვის შემდეგ გარემოს ცვლადები
// ინახება process.env - ში

// mongoDB - არის NoSQL ტიპის მონაცემთა ბაზა, ის ინახავს მონაცემებს JSON - ის მგავს ფორმატში

app.listen(process.env.PORT, () => {
    console.log('The server is running')
});