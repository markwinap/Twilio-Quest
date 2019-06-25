/*
Please read
https://www.twilio.com/docs/usage/secure-credentials

LINUX MAC
echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
source ./twilio.env

WINDOWS
set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
set TWILIO_AUTH_TOKEN=your_auth_token
*/
//GET LIST OF AVAILABLE NUMBERS
//https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/AvailablePhoneNumbers/US/Local.json?AreaCode=510&PageSize=20'

const https = require('https');
const querystring = require('querystring');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

async function main(){
      let params = {
            method: 'GET', //POST
            path: `/AvailablePhoneNumbers/US/Local.json?${querystring.stringify({ AreaCode: 510, PageSize: 3})}`,
            data: ''
      }
      let numbers = await twilioAPI(params).then(res => res).catch(err => {console.log(err); return false;});
      if(numbers){
            //Numbers Found//
            console.log(numbers);
            /*
            { friendly_name: '(510) 900
            phone_number: '+151090054
            lata: '722',             
            rate_center: 'OKLD BKLY',
            latitude: null,          
            longitude: null,         
            locality: 'East Bay Berke
            region: 'CA',            
            postal_code: null,       
            iso_country: 'US',       
            address_requirements: 'no
            beta: false,             
            capabilities: {voice: true, SMS: true, MMS: true, fax: false}} }
            */
      }
      else{
            //PRINT ERROR
            console.log(numbers);
      }
      
}
main();

function twilioAPI(params) {
      return new Promise((resolve, reject) => {
            let post_req = https.request({
                  host: `api.twilio.com`,
                  path: `/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}${params.path}`,
                  method: params.method,
                  auth: `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`,
                  headers: {
                        'Accept': 'application/json'
                  }
            }, function (res) {
                  res.setEncoding('utf8');
                  let result = '';
                  res.on('data', function (chunk) {
                        result += chunk;
                  });
                  res.on('end', function () {
                        if (res.statusCode === 200 || res.statusCode === 201) {
                              resolve(JSON.parse(result));
                        } else {
                              reject(res.statusCode);
                        }
                  });
                  res.on('error', function (err) {
                        reject(err);
                  });
            });
            if (params.method == 'POST' || params.method == 'PUT') {
                  post_req.write(params.data);
            }
            post_req.on('error', function (err) {
                  reject(err);
            });
            post_req.on('socket', function (socket) {
                  socket.setTimeout(8000, function () {
                        post_req.abort();
                  });
            });
            post_req.end();
      });
}