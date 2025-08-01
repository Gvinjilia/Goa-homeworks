/* 1) შექმენით json ის ფაილი სახელად cars ჩათჯიპიტის დააწერეიეთ 10 ელემენტიანი მასიივი json ის ფორმატში და ჩასვით ფაილში, შემდეგ შექმენით სერვერი რომელიც ამოწმებს უდრის თუ 
არა ბილიკი /cars  და მეთოდი GET თუ ემთვევა დაუბრუნეთ json ის მონაცემები რომელსაც წაიკითხავთ ფაილიდა, აგრეთვე გამოიყენეთ writeHead იმისათის რომ გაუწეროთ სტატუსის კოდი და დამატებითი 
ინფორმაცია content-type მოიძიეთ ამის შესახებ ინფორმაცია */

const http = require('http');
const fs = require('fs');

const cars = fs.readFileSync('cars.json', 'utf-8');

const server = http.createServer((req, res) => {
    if(req.url === '/cars' && req.method === 'GET'){
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(cars);
    }
})

server.listen(3000, () => {
    console.log('Server is running at port 3000');
});