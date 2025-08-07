const { getTours, getTour, patchTour, deleteTour, addTour } = require("../controllers/tour.controller.js");

const router = (req, res) => {
    const { url, method } = req;

    if(url === "/tours" && method === "GET") {
        return getTours(req, res);
    } else if(url.startsWith('/tour') && method === "GET") {
        return getTour(req, res);
    } else if (url.startsWith('/tour') && method === 'PATCH'){
        return patchTour(req, res);
    } else if (url.startsWith('/tour') && method === 'DELETE'){
        return deleteTour(req, res);
    } else if (url.startsWith('/tours') && method === 'POST') {
        return addTour(req, res);
    }
}

module.exports = router;