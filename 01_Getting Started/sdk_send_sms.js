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

/*
RESULT OF LSEND SMS

{ accountSid: 'AC31dc21046160bf3d675ef09e6bc5ce19',
  apiVersion: '2010-04-01',
  body: 'HOLA',
  dateCreated: 2019-06-30T19:11:43.000Z,
  dateUpdated: 2019-06-30T19:11:43.000Z,
  dateSent: null,
  direction: 'outbound-api',
  errorCode: null,
  errorMessage: null,
  from: '+15123371956',
  messagingServiceSid: null,
  numMedia: '0',
  numSegments: '1',
  price: null,
  priceUnit: 'USD',
  sid: 'SMb6078e2049cb4a6a934c8b15e6e03427',
  status: 'queued',
  subresourceUris:
   { media:
      '/2010-04-01/Accounts/AC31dc21046160bf3d675ef09e6bc5ce19/Messages/SMb6078e2049cb4a6a934c8b15e6e03427/Media.json' },
  to: '+5214425921010',
  uri:
   '/2010-04-01/Accounts/AC31dc21046160bf3d675ef09e6bc5ce19/Messages/SMb6078e2049cb4a6a934c8b15e6e03427.json' }
*/

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

async function sendSMS(){
    let sms = await client.messages
    .create({from: '+15123371956', body: '8G624CVLCH0ZVUC', to: '+5214425921010'})
    .then(message => message);
    console.log(sms)
}
sendSMS();

