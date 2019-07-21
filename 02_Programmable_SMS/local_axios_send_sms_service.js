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
const axios = require('axios');
const querystring = require('querystring');

main();
async function main(){
      let sms = await axios({
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          auth: {
              username: process.env.TWILIO_ACCOUNT_SID,
              password: process.env.TWILIO_AUTH_TOKEN
          },
          url: `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
          data: querystring.stringify({ MessagingServiceSid: 'MG128a15b7fb5ddf5090d507d04be383f1', To: '+16193040469', Body: 'Welcome To Cloud Love'})
      }).then(res => res).catch(err => err);
      console.log(sms)
  }