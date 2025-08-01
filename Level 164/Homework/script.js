/* 1) შექმენით თქვენივე server - ი, რომელიც იღებს POST request - ს, როდესაც მომხამრებელი გააგზავნის რაიმე მოთხოვნას server - მა ეს მოთხოვნები (message - ები) უნდა მიიღოს და დაამატოს 
messages - ის მასივში, საბოლოოდ კი უნდა გამოიტანოს message - ი როგორიცაა 'Message saved in messages array' console - ში, გამოიყენეთ writeHead, status - ის კოდისთვის, if - ში შეამოწმეთ 
თუ req.url არის '/messages' და მეთოდი არის POST - ი მაშინ შეასრულეთ ზემოთ მოცემული დავალება, სხვა შემთხვევაში კი გამოიტანეთ ERROR happened

2) კომენტარების სახით ახსენით დაწერილი კოდი (დეტალურად) */

const http = require('http'); // ვა - import - ებთ http module - ს, require - ის დახმარებით

let messages = []; // ვქმნით მასივს messages - სადაც შევინახავთ მომხმარებლის მიერ მოთხოვნილ მონაცემებს რომელიც მოითხოვა POST - ით

const server = http.createServer((req, res) => { // ვქმნით server - ს http.createServer - ის დხამარებით, რომელსაც გადაეცემა ორი ობიექტი, პირველი - req - request
    // იგივე მოთხოვნა მეორე - res - იგივე პასუხი
    if(req.url === '/messages' && req.method === 'POST'){ // if statment - ის გამოყენებით ვამოწმებთ თუ req.url (მისამართი) უდრის messages და req ობიექტის მოთხოვნა 
        // უდრის POST - ს მაშინ გავუშვებთ ქვემოთ არსებულ კოდს
        let data = ''; // იქმნება ცვლადი სახელად data სადაც ჩვენ შევინახავთ მომხმარებლის მიერ მოთხოვნილ მონაცემებს string - ში

        req.on('data', chunk => { // req ობიექტზე ვიყენებთ on მეთოდს, ვუსმენთ data მოვლენას, გვაქვს ერთი არგუმენტი სახელად chunk - ეს არის მომხმარებლის მიერ
            // შემოტანილი თითოეული მონაცემი
            data += chunk; // რომელიც შემდეგ ემატება ჩვენს მიერ შექმნილ data ცლადში (string - ში)
        });

        req.on('end', () => { // req ობიექტზე ჩვენ ვიყენებთ on მეთოდს, ვუსმენთ end მოვლენას
            messages.push(JSON.parse(data)); // messages მასივში ვამატებთ data მნიშვნელობას, რადგანაც ვიცით რომ data ცლადში ინახება string - ად გარდაქმნილი
            // მონაცემები, JSON.parse - ის გამოყენებით გადმოგვქვს მონაცემები Javascript - ისთვს გასაგებ ენაზე
            console.log(messages); // console - ში ვბეჭდავთ messages მასივს

            res.writeHead(200, {'content-type': 'application/json'}); // res.writeHead - ს გადავეცით 200 მნიშვნელობა რაც იმას ნიშნავს
            // რომ მომხმარებლის მიერ გაგზავნილი მონაცემები გაიგზავნა წარმატებით 
            console.log('Message saved in messages array'); // მომხმარებლს ვაცნობეთ რომ მის მიერ მოთხოვნილი message წარმატებით ჩაემატა messages მასივში
        });
    } else {
        res.end('ERROR happened'); // იმ შემთხვევაში თუ ზემოთ მოცემული პირობა არ შესრულდა, ვიღებთ შემდეგ ტექსტს ERROR happened
    }
})

server.listen(3000, () => { // server - ი იყენებს listen მეთოდს რომელიც მუშაობს port 3000 - ზე
    console.log('Server is running at port 3000') // ვრწმუნდებით რომ server - ი მუშაობს და console - ში გამოგვაქვს Server is running at port 3000
});