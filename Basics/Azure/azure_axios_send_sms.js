const axios = require('axios');
const querystring = require('querystring');

module.exports = async function (context, req) {
    let sms = await axios({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        auth: {
            username: process.env.TWILIO_ACCOUNT_SID,
            password: process.env.TWILIO_AUTH_TOKEN
        },
        url: `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
        data: querystring.stringify({ From: '+15123371956', To: '+5214425921010', Body: 'Welcome To Cloud Love From MS Azure'})
    }).then(res => res).catch(err => err);

    context.res = {
        headers: {'content-type': 'application/xml'},
        status: 200,
        body: JSON.stringify(sms.data)
    }
};
