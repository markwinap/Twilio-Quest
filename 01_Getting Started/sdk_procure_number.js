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
RESULT OF LIST AVAILABLE NUMBERS
[ { friendlyName: '(510) 380-8519',
    phoneNumber: '+15103808519',
    lata: '722',
    locality: 'East Bay Mn Piedmont',
    rateCenter: 'OKLD MN-PD',
    latitude: null,
    longitude: null,
    region: 'CA',
    postalCode: null,
    isoCountry: 'US',
    addressRequirements: 'none',
    beta: false,
    capabilities: { voice: true, SMS: true, MMS: true, fax: true } } ]



{ accountSid: 'AC31dc21046160bf3d675ef09e6bc5ce19',
  addressSid: null,
  addressRequirements: 'none',
  apiVersion: '2010-04-01',
  beta: false,
  capabilities: { voice: true, sms: true, mms: true, fax: true },
  dateCreated: 2019-07-07T14:10:41.000Z,
  dateUpdated: 2019-07-07T14:10:41.000Z,
  friendlyName: '(510) 592-6709',
  identitySid: null,
  phoneNumber: '+15105926709',
  origin: 'twilio',
  sid: 'PNc8e059a11455be62b6ba6f5ba933f1a7',
  smsApplicationSid: '',
  smsFallbackMethod: 'POST',
  smsFallbackUrl: '',
  smsMethod: 'POST',
  smsUrl: '',
  statusCallback: '',
  statusCallbackMethod: 'POST',
  trunkSid: null,
  uri:
   '/2010-04-01/Accounts/AC31dc21046160bf3d675ef09e6bc5ce19/IncomingPhoneNumbers/PNc8e059a11455be62b6ba6f5ba933f1a7.json',
  voiceApplicationSid: null,
  voiceCallerIdLookup: false,
  voiceFallbackMethod: 'POST',
  voiceFallbackUrl: null,
  voiceMethod: 'POST',
  voiceUrl: null,
  emergencyStatus: 'Inactive',
  emergencyAddressSid: null }    
    
*/

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

async function getNumber(){
    let number = await client.availablePhoneNumbers('US')//Search for numbers
    .local
    .list({areaCode: 510, limit: 1})
    .then(local => local)

    let resource = await client.incomingPhoneNumbers
        .create({phoneNumber: number[0].phoneNumber})
        .then(incoming_phone_number => incoming_phone_number);
    console.log(resource)
}
getNumber();

