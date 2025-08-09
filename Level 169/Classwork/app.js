const express = require('express');

const tours = [
  {
    "id": 1,
    "name": "The Forest Hiker",
    "maxGroupSize": 25,
    "price": 397
  },
  {
    "id": 2,
    "name": "The Sea Explorer",
    "maxGroupSize": 15,
    "price": 497
  },
  {
    "id": 3,
    "name": "The Snow Adventurer",
    "maxGroupSize": 10,
    "price": 997
  },
  {
    "id": 4,
    "name": "The City Wanderer",
    "maxGroupSize": 20,
    "price": 1197
  },
  {
    "id": 5,
    "name": "The Park Camper",
    "maxGroupSize": 15,
    "price": 1497
  },
  {
    "id": 6,
    "name": "The Sports Lover",
    "maxGroupSize": 8,
    "price": 2997
  },
  {
    "id": 7,
    "name": "The Wine Taster",
    "maxGroupSize": 8,
    "price": 1997
  },
  {
    "id": 8,
    "name": "The Star Gazer",
    "maxGroupSize": 8,
    "price": 2997
  },
  {
    "id": 9,
    "name": "The Northern Lights",
    "maxGroupSize": 12,
    "price": 1497
  }
];

const app = express();


app.get('/tours', (req, res) => {
    const { sort, limit } = req.query;
    let newTours = [...tours];

    if(sort === 'price'){
      newTours.sort((a, b) => a.price - b.price);
    }
    
    if(sort === '-price'){
      newTours.sort((a, b) => b.price - a.price);
    }

    if(limit){
      newTours.splice(limit, tours.length - limit);
    }

    res.status(200).json(newTours);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});