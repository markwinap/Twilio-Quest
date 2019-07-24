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
    //res.set('Content-Type', 'application/xml');
    res.send('OK');
});
// POST /login gets urlencoded bodies
app.post('/', urlencodedParser, function (req, res) {
    //res.set('Content-Type', 'application/xml');
    console.log(req.body)
    console.log(req.headers)
    console.log('\n')
    res.send('OK');
});
// POST /api/users gets JSON bodies
app.post('/json', jsonParser, function (req, res) {
  // create user in req.body
});
app.listen(port, () => console.log(`NodeJS Express Server Running On Port ${port}!`));

/*
{ SmsSid: 'SMa0838726ec004d2fb17444783dccb14f',
  SmsStatus: 'delivered',
  MessageStatus: 'delivered',
  To: '+15123371956',
  MessageSid: 'SMa0838726ec004d2fb17444783dccb14f',
  AccountSid: 'AC31dc21046160bf3d675ef09e6bc5ce19',
  From: '+16193892226',
  ApiVersion: '2010-04-01' }
{ 'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
  'x-twilio-signature': 'sG5cYjh3IHSvT2JggeUkE6bSuP8=',
  'accept-encoding': 'gzip,deflate',
  'content-length': '237',
  host: '74efcbb4.ngrok.io',
  'cache-control': 'max-age=259200',
  'user-agent': 'TwilioProxy/1.1',
  connection: 'close',
  'x-forwarded-proto': 'https',
  'x-forwarded-for': '52.91.96.101' }

*/