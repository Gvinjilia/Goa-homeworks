const http = require('http');
const fs = require('fs');

const htmlFiles = ['index.html', 'index1.html', 'index2.html'];

const server = http.createServer((req, res) => {
    const randomHtmlFiles = Math.floor(Math.random() * htmlFiles.length);

    fs.readFile(htmlFiles[randomHtmlFiles], 'utf-8', (err, data) => {
        if(err){
            res.end('<h1>Could not read the file</h1>');
        } else {
            res.end(data)
        }
    })
});

server.listen(3000, () => {
    console.log('The server is running');
});

// server - ი არის დიდი კომპიუტერი, რომელიც იღებს რაიმე მოთხოვნებს და ასევე აბრუნებს მონაცემებს
// request - არის იგივე მოთხოვნა, მაგალითად client (browser) - აკეთებს მოთხოვნას server - თან ხოლო server - ი აბრუნებს პასუხს იგივე მონაცემებს
// როდესაც server - ი გვიბრუნებს ჩვენ საჭირო ფაილებს ამას ეწოდება response
// http module - ს ჩვენ ვიყენებთ იმისთვის რომ შევქმნათ server - ი, http module - ი არ არის ჩაშენებული module რაც იმას ნიშნავს რომ ჩვენ გვიწევს მისი და - import - ება 
// require - ის გამოყენებით

// res.end() - ი არის იგივე response - ის დამთავრება, ეს ნიშნავს იმას რომ server - მა მიიღო მოთხოვნა და მზადაა რომ დააბრუნოს პასუხი