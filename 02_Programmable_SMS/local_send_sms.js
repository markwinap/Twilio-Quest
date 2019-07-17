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

set TWILIO_TEST_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
set TWILIO_TEST_AUTH_TOKEN=your_auth_token
*/
const https = require('https');
const querystring = require('querystring');

async function main(){
      let params = {
            method: 'POST', //POST
            path: `/Messages.json`,
            headers: {'Content-Type':'application/x-www-form-urlencoded','Accept': 'application/json'},
            data: querystring.stringify({ From: '+15123371956', To: '+5214425921010', Body: '+15123371956'})
      }
      let SMS = await twilioAPI(params).then(res => res).catch(err => {console.log(err); return false;});
      console.log(SMS)
}
main();

function twilioAPI(params) {
      return new Promise((resolve, reject) => {
            let post_req = https.request({
                  host: `api.twilio.com`,
                  path: `/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}${params.path}`,
                  method: params.method,
                  auth: `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`,
                  headers: params.headers
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