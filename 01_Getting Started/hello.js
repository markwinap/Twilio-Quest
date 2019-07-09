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
    res.send('Hello World');
});
app.post('/', function (req, res) {
    res.send('Hello World');
});
app.listen(port, () => console.log(`NodeJS Express Server Running On Port ${port}!`));
