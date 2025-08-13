const cars = [];

const get = (req, res) => {
    res.json(cars);
};

const getById = (req, res) => {
    const { id } = req.params;

    const index = cars.findIndex(car => car.id === parseInt(id));

    if(index === -1){
        return res.status(404).json({
            status: "Fail", 
            message: "Car not found"
        })
    }

    res.status(200).json(cars[index]);
};

const post = (req, res) => {
    const { make, model, price, year } = req.body;

    if(!make || !model || !price || !year){
        return res.status(400).json({
            status: "Fail",
            message: "All fields are required"
        })
    }

    const newCar = {
        id: Date.now(),
        make, 
        model,
        price,
        year
    }

    cars.push(newCar);

    res.status(201).json(cars);
};

const patch = (req, res) => {
    const { id } = req.params;
    const { make, model, price, year } = req.body;

    const index = cars.findIndex((car) => car.id === parseInt(id));

    if(index === -1){
        return res.status(404).json({
            status: "Fail",
            message: "Car not found"
        })
    }

    if(make !== undefined){
        cars[index].make = make
    }

    if(model !== undefined){
        cars[index].model = model
    }

    if(price !== undefined){
        cars[index].price = price
    }

    if(year !== undefined){
        cars[index].year = year
    }

    res.status(200).json(cars[index]);
};

const deleteById = (req, res) => {
    const { id } = req.params;

    const index = cars.findIndex((car) => car.id === parseInt(id));

    if(index === -1){
        return res.status(404).json({
            status: "Fail",
            message: "Car not found"
        })
    }

    cars.splice(index, 1);

    res.status(204).send();
};

module.exports = {
    get,
    getById,
    post,
    patch,
    deleteById
}