const express = require('express');
const bodyParser = require('body-parser');
 
const app = express();
const port = 3000;
console.log(process.env.PORT)
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });


let todo = [];

app.get('/', function (req, res) {
    res.set('Content-Type', 'application/xml');
    let message = xml([
        twiml({Message : {}}, 'Welcome To CloudLove, FROM LOCAL SERVER and no SDK required')
    ]);
    res.send(message);
});
// POST /login gets urlencoded bodies
app.post('/', urlencodedParser, function (req, res) {
    console.log(req.body)
    console.log(req.headers)
    /*
    let body = req.body.Body;
    let slice = body.slice(0, 3);
    let respose = '';
    if(slice == 'add'){
        let item = body.slice(4);
        todo.push(item);
        respose = `Item ${item} added to todo list`;
    }
    else if(slice == 'lis'){
        for(let i in todo){
            respose += `${i} - ${todo[i]}\n`;
        }
    }
    else if(slice == 'rem'){
        todo.splice(body.slice(-1), 1);
        respose = `Item ${body.slice(-1)} removed from todo list`;
    }
    console.log(respose);
*/
    res.set('Content-Type', 'application/xml');
    let message = xml([
        twiml({Message : {}}, 'OK')
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


//Message Body
/*

{ 'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
  'x-twilio-signature': 'P1cNp9OOyqHis05PfinrC4qoxzU=',
  'accept-encoding': 'gzip,deflate',
  'content-length': '227',
  host: '74efcbb4.ngrok.io',
  'cache-control': 'max-age=259200',
  'user-agent': 'TwilioProxy/1.1',
  connection: 'close',
  'x-forwarded-proto': 'https',
  'x-forwarded-for': '54.86.154.97' }
{ ToCountry: 'US',
  ToState: 'TX',
  SmsMessageSid: 'SM4e997a30466301bd4f165ab892ae8223',
  NumMedia: '0',
  ToCity: 'LEANDER',
  FromZip: '92123',
  SmsSid: 'SM4e997a30466301bd4f165ab892ae8223',
  FromState: 'CA',
  SmsStatus: 'received',
  FromCity: 'SAN DIEGO',
  Body: 'Hola',
  FromCountry: 'US',
  To: '+15123371956',
  ToZip: '78645',
  AddOns:
   '{"status":"successful","message":null,"code":null,"results":{}}',
  NumSegments: '1',
  MessageSid: 'SM4e997a30466301bd4f165ab892ae8223',
  AccountSid: 'AC31dc21046160bf3d675ef09e6bc5ce19',
  From: '+16193892226',
  ApiVersion: '2010-04-01' }

*/