const hotels = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    description: "Luxury 5-star hotel with city views and spa services.",
    price: 250
  },
  {
    id: 2,
    name: "Seaside Resort",
    description: "Beachfront resort with pools, bars, and water sports.",
    price: 180
  },
  {
    id: 3,
    name: "Mountain Escape Lodge",
    description: "Cozy lodge surrounded by mountains and hiking trails.",
    price: 140
  },
  {
    id: 4,
    name: "Urban Stay Inn",
    description: "Modern downtown hotel close to shops and restaurants.",
    price: 120
  },
  {
    id: 5,
    name: "Lakeview Retreat",
    description: "Quiet retreat with stunning lake views and cabins.",
    price: 160
  },
  {
    id: 6,
    name: "Business Comfort Hotel",
    description: "Perfect for business trips with meeting rooms and Wi-Fi.",
    price: 110
  },
  {
    id: 7,
    name: "Royal Heritage Hotel",
    description: "Historic hotel with elegant interiors and fine dining.",
    price: 220
  },
  {
    id: 8,
    name: "Desert Oasis Resort",
    description: "Resort in the desert with pools and guided tours.",
    price: 175
  },
  {
    id: 9,
    name: "Eco Green Hotel",
    description: "Environment-friendly hotel with sustainable design.",
    price: 130
  },
  {
    id: 10,
    name: "Airport Express Hotel",
    description: "Convenient stay near the airport with shuttle service.",
    price: 90
  }
];

const getAll = (req, res) => {
    res.json(hotels);
};

const getHotelById = (req, res) => {
    const { id } = req.params;

    const hotel = hotels.find(hotel => hotel.id === id * 1);

    if(!hotel){
        return res.status(404).json({
            status: 'Fail',
            message: 'The hotel not found'
        })
    }

    res.status(200).json(hotel);
};

const createHotel = (req, res) => {
    const { name, description, price } = req.body;

    if(!name || !description || !price){
        return res.status(400).json({
            status: 'Fail',
            message: 'All fields are required name, description, price'
        })
    }

    const newHotel = {
        id: hotels[hotels.length - 1].id + 1,
        name,
        description,
        price
    }

    hotels.push(newHotel);

    res.status(201).json(newHotel);
};

const updateHotel = (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const hotel = hotels.find(hotel => hotel.id === id * 1);

    if(name !== undefined) hotel.name = name;
    if(description !== undefined) hotel.description = description;
    if(price !== undefined) hotel.price = price;

    res.status(200).json(hotel);
};

const deleteHotelById = (req, res) => {
    const { id } = req.params;

    const index = hotels.findIndex(hotel => hotel.id === id * 1);

    if(index === -1){
        return res.status(404).json({
            status: 'Fail',
            message: 'Hotel not found'
        })
    }

    hotels.splice(index, 1);

    res.status(204).send();
};

module.exports = { getAll, getHotelById, createHotel, updateHotel, deleteHotelById };