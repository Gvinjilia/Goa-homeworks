const express = require('express');
const { products } = require('./products');

const app = express();

app.get('/products', (req, res) => {
    const { sort, limit } = req.query;
    const newProducts = [...products];

    if(sort === 'price'){
        newProducts.sort((a, b) => a.price - b.price);
    }

    if(sort === '-price'){
        newProducts.sort((a, b) => b.price - a.price);
    }

    if(limit){
        newProducts.splice(limit, newProducts.length - limit);
    }

    res.status(200).json(newProducts);
});

app.get('/products/:id', (req, res) => {
    const {id} = req.params;

    const index = products.findIndex(product => product.id === parseInt(id));

    res.json(products[index]);
});

app.post('/products', express.json(), (req, res) => {
    const {name, price, category} = req.body;

    if(!name || !price || !category){
        return res.status(400).json({
            status: 'Fail',
            message: 'To add a new product you should enter product name, price, category'
        });
    }

    const newProduct = {
        id: products[products.length - 1].id + 1,
        name,
        price,
        category
    };

    products.push(newProduct);

    res.status(200).json(newProduct);
});

app.delete('/products/:id', (req, res) => {
    const {id} = req.params;

    const index = products.findIndex(product => product.id === parseInt(id));

    products.splice(index, 1);

    res.status(204).json(products);
});

app.patch('/products/:id', express.json(), (req, res) => {
    const {id} = req.params;
    const {name, price, category} = req.body;

    const index = products.findIndex(product => product.id === parseInt(id));

    if(index === -1){
        return res.status(404).json({
            status: "Fail",
            message: 'Product not found'
        });
    };

    if(name !== undefined){
        products[index].name = name;
    }

    if(price !== undefined){
        products[index].price = price;
    }

    if(price !== undefined){
        products[index].category = category;
    }

    res.json(products[index]);
});

app.listen(3000, () => {
    console.log('The server is running on port 3000');
});