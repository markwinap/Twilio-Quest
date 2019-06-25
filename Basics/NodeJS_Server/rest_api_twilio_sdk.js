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

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.availablePhoneNumbers('US')
      .local
      .list({areaCode: 510, limit: 20})
      .then(local => local.forEach(l => console.log(l.friendlyName)));