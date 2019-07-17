const express = require('express');
const bodyParser = require('body-parser');
 
const app = express();
const port = 3000;
console.log(process.env.PORT)
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
    res.set('Content-Type', 'application/xml');
    let message = xml([
        twiml({Message : {}}, 'Welcome To CloudLove, FROM LOCAL SERVER and no SDK required')
    ]);
    res.send(message);
});
// POST /login gets urlencoded bodies
app.post('/', urlencodedParser, function (req, res) {
    res.set('Content-Type', 'application/xml');
    let message = xml([
        twiml({Message : {}}, 'Welcome To CloudLove')
    ]);
    res.send(message);
});
// POST /api/users gets JSON bodies
app.post('/json', jsonParser, function (req, res) {
  // create user in req.body
});
app.listen(port, () => console.log(`NodeJS Express Server Running On Port ${port}!`));
//CUSTOM FUNCTIONS
function xml(twimls) {
    return `<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response>${twimls.join('')}</Response>`;
}
function twiml(obj, nested){
    let tbase = '';
    let verb = Object.keys(obj)[0];
    Object.keys(obj[verb]).forEach( attribute => {
        tbase += ` ${attribute}="${obj[verb][attribute]}"`;
    });
  return `<${verb}${tbase}>${nested}</${verb}>`;
}
/*
BASIC RESPONSE
let message = xml([
    twiml({Say : {voice: 'alice'}}, 'Welcome To CloudLove')
]);
<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="alice">Welcome To CloudLove</Say></Response>
*/

/*
NESTED
let message = xml([
        twiml({Dial : {}}, twiml({Number : {sendDigits: 'wwww1928'}}, '415-123-4567'))
]);
<?xml version="1.0" encoding="UTF-8"?><Response><Dial><Number sendDigits="wwww1928">415-123-4567</Number></Dial></Response>
*/

/*
MULTI VERBS AND NESTED
let message = xml([
        twiml({Gather : {action: '/process_gather.php', method: 'GET'}}, twiml({Say : {}}, 'Please enter your account number, followed by the pound sign')),
        twiml({Say : {}}, 'We didnt receive any input. Goodbye!')
]);
<?xml version="1.0" encoding="UTF-8"?><Response><Gather action="/process_gather.php" method="GET"><Say>Please enter your account number, followed by the pound sign</Say></Gather><Say>We didnt receive any input. Goodbye!</Say></Response>
*/