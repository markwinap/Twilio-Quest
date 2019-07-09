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
//GET LIST OF AVAILABLE NUMBERS
//https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/AvailablePhoneNumbers/US/Local.json?AreaCode=510&PageSize=20'


/*
RESULT
{ sid: 'SM3f95c3dbe32947f1ad642604138b3aac',
  date_created: 'Sun, 30 Jun 2019 19:14:23 +0000',
  date_updated: 'Sun, 30 Jun 2019 19:14:23 +0000',
  date_sent: null,
  account_sid: 'AC31dc21046160bf3d675ef09e6bc5ce19',
  to: '+5214425921010',
  from: '+15123371956',
  messaging_service_sid: null,
  body: 'HOla',
  status: 'queued',
  num_segments: '1',
  num_media: '0',
  direction: 'outbound-api',
  api_version: '2010-04-01',
  price: null,
  price_unit: 'USD',
  error_code: null,
  error_message: null,
  uri:
   '/2010-04-01/Accounts/AC31dc21046160bf3d675ef09e6bc5ce19/Messages/SM3f95c3dbe32947f1ad642604138b3aac.json',
  subresource_uris:
   { media:
      '/2010-04-01/Accounts/AC31dc21046160bf3d675ef09e6bc5ce19/Messages/SM3f95c3dbe32947f1ad642604138b3aac/Media.json' } }
*/

const https = require('https');
const querystring = require('querystring');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

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