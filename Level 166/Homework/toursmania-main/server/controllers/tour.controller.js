const url = require("url");

const { readFile, writeFile } = require("../utils/dataMethods.js");

const getTours = (req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(readFile('./data/tours.json'))
}

const getTour = (req, res) => {
    const urlParts = url.parse(req.url, true);
    const tourId = parseInt(urlParts.query.id);
    const tours = JSON.parse(readFile('./data/tours.json'));
    const tour = tours.find(t => t.id === tourId);

    if (!tour) {
        res.writeHead(404, { "content-type": "application/json" });
        return res.end(JSON.stringify({ message: "Tour not found" }));
    }

    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(tour))
}

const patchTour = (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const urlParts = url.parse(req.url, true);
        const id = parseInt(urlParts.query.id);
        const tours = JSON.parse(readFile('./data/tours.json'));
        const tour = tours.find(tour => tour.id === id);

        if(!tour){
            return res.end('<h1>Tour not found</h1>');
        } 

        let {name, price, description} = JSON.parse(body);

        if(name){
            tour.name = name;
        }

        if(price){
            tour.price = price;
        }

        if(description){
            tour.description = description;
        }

        writeFile('./data/tours.json', tours)
    
        res.writeHead(200, {'content-type': 'application/json'})
        res.end(JSON.stringify(tour));
    })
};

const deleteTour = (req, res) => {
    const urlParts = url.parse(req.url, true);
    const id = parseInt(urlParts.query.id);

    const tours = JSON.parse(readFile('./data/tours.json'));
    const tour = tours.find(tour => tour.id === id);

    if(!tour){
        return res.end('<h1>Tour not found</h1>');
    }

    const updateTour = tours.filter(tour => tour.id !== id);

    writeFile('./data/tours.json', updateTour);

    res.writeHead(200, {'content-type': 'application/json'});
    res.end('<h1>Tour deleted successfully</h1>');
}

const addTour = (req, res) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk.toString();
    });

    req.on('end', () => {
        const addedTour = JSON.parse(data);
        const tours = JSON.parse(readFile('./data/tours.json'));
        addedTour.id = tours[tours.length - 1].id + 1;
        tours.push(addedTour);

        writeFile('./data/tours.json', tours);

        res.writeHead(201, {'content-type': 'application/json'});
        res.end(JSON.stringify(addedTour));
    });
}

module.exports = {
    getTours,
    getTour,
    patchTour,
    deleteTour,
    addTour
}