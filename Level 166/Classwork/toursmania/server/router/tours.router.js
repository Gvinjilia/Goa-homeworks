const { getTours } = require("../controllers/tours.controller");

const routes = (req, res) => {
    const {url, method} = req;

    if(url === '/tours' && method === 'GET'){
        return getTours(req, res);
    }
}

module.exports = {
    routes
}