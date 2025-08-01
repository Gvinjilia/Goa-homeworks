// 3) postman დაყენების შემდეგ გააგზავნეთ post მოთხოვნა მონაცემებით თქვენს სერვერზე, სერვერზე მონაცემების მიღებისას გადათარგმნეთ json იდან ჩვეულებრივ მონაცემად და დაამატეთ cars მასივში
const http = require('http');

const newCars = [];

const server = http.createServer((req, res) => {
    if (req.url === '/cars' && req.method === 'POST'){
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            newCars.push(JSON.parse(data));
            console.log(newCars);

            res.end('Car added successfully to cars array');
        });
    }
})

server.listen(3000, () => {
    console.log('Server is running at port 3000');
});