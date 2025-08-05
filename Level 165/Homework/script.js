/* დაამატეთ put შემთხვევა, თვქენთან იგზავნება ობიექტი რომელში შეიძლება მოცემული იყოს ერთერთი კუთვბნილება მაგ: make, model ან year, რომელი მნიშნელობაც გადმოგვეცემა მაგ მნიშვნელობით 
შევცვლით შესაბამის კუთვნილებას, აგრეთვე ლინკში უნბდა იყოს მოცემული მანქანის ID რომლის შეცვლაც გინდათ */

const http = require('http');
const fs = require('fs');
const url = require('url');

const getData = (req, res) => {
    res.end(fs.readFileSync('cars.json', 'utf-8'));
};

const deleteCar = (req, res) => {
    const urlParts = url.parse(req.url, true);
    const carId = parseInt((urlParts.query.id));

    const carsObjs = JSON.parse(fs.readFileSync('cars.json', 'utf-8'));

    const filrtered = carsObjs.filter(car => car.id !== carId);

    fs.writeFileSync('cars.json', JSON.stringify(filrtered));

    return res.end('<h1>Car Deleted successfully</h1>');
};

const createCar = (req, res) => {
    let data = '';

    req.on('data', (chunk) => {
        data += chunk.toString();
    });

    req.on('end', () => {
        let userCar = JSON.parse(data);
        const cars = JSON.parse(fs.readFileSync('cars.json', 'utf-8'));
        userCar.id = cars.length ? cars[cars.length - 1].id + 1 : 1;

        cars.push(userCar);

        fs.writeFileSync('cars.json', JSON.stringify(cars));

        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(userCar));
    })
};


const updateCar = (req, res) => {
    const urlParts = url.parse(req.url, true);
    const carId = parseInt((urlParts.query.id));

    const cars = JSON.parse(fs.readFileSync('cars.json', 'utf-8'));
    const car = cars.find(car => car.id === carId);

    
    if(!car){
        res.end('<h1>Car not found</h1>');
        return;
    }

    let data = '';

    req.on('data', (chunk) => {
        data += chunk.toString();
    });

    req.on('end', () => {
        let {brand, model, year} = JSON.parse(data);
        
        if(brand){
            car.brand = brand;
        }

        if(model){
            car.model = model;
        }

        if(year){
            car.year = year;
        }

        fs.writeFileSync('cars.json', JSON.stringify(cars));
        res.writeHead(200, {'Content-type': 'application.json'});

        res.end(JSON.stringify(car));
    });
};

const server = http.createServer((req, res) => {
    const { method } = req;

    switch(method){
        case 'GET':
            return getData(req, res);
        case 'DELETE':
            return deleteCar(req, res);
        case 'POST':
            return createCar(req, res);
        case 'PUT':
            return updateCar(req, res);
    }
});

server.listen(3000, () => {
    console.log('The server is running on port 3000');
});