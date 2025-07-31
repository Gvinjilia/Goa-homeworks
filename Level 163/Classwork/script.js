const http = require('http');

const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const register = fs.readFileSync('register.html', 'utf-8');

const server = http.createServer((req, res) => {
    if(req.url === '/' || req.url === '/home'){
        res.end(html);
    } else if(req.url === '/register'){
        res.end(register);
    } else {
        res.end('<h1>404 not found</h1>')
    }
})

server.listen(3000, () => {
    console.log('The server is running on port 3000');
})