const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse  = require('twilio').twiml.MessagingResponse;
const app = express();
const port = 3000;
 
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {//http://localhost:3000/
    const response = new MessagingResponse ();
    response.message('Hello World');
    res.set('Content-Type', 'application/xml');
    res.send(response.toString());
});
// POST /login gets urlencoded bodies
app.post('/', urlencodedParser, function (req, res) {
    const response = new MessagingResponse ();
    response.message('Hello World!');
    res.set('Content-Type', 'application/xml');
    res.send(response.toString());
});
// POST /api/users gets JSON bodies
app.post('/json', jsonParser, function (req, res) {
  // create user in req.body
});
app.listen(port, () => console.log(`NodeJS Express Server Running On Port ${port}!`));