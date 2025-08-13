const express = require('express');
const { get, getById, post, patch, deleteById } = require('../controllers/cars.controllers');

const carsRouter = express.Router();

carsRouter.get('/', get);

carsRouter.get('/:id', getById);

carsRouter.post('/', express.json(), post);

carsRouter.patch('/:id', express.json(), patch);


carsRouter.delete('/:id', deleteById);

module.exports = carsRouter;