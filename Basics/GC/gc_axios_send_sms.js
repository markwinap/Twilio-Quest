const axios = require('axios');
const querystring = require('querystring');

exports.handler = async (req, res) => {
    let sms = await axios({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        auth: {
            username: process.env.TWILIO_ACCOUNT_SID,
            password: process.env.TWILIO_AUTH_TOKEN
        },
        url: `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
        data: querystring.stringify({ From: '+15123371956', To: '+5214425921010', Body: 'Welcome To Cloud Love From GC'})
    }).then(res => res).catch(err => err);

    res.set('content-type', 'application/json');
    res.status(200).send(JSON.stringify(sms.data));
};