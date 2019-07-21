const axios = require('axios');
const querystring = require('querystring');

exports.handler = function(context, event, callback) {
    main(context, event, callback);
};
async function main(context, event, callback){
    let sms = await axios({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        auth: {
            username: process.env.ACCOUNT_SID,
            password: process.env.AUTH_TOKEN
        },
        url: `https://api.twilio.com/2010-04-01/Accounts/${process.env.ACCOUNT_SID}/Messages.json`,
        data: querystring.stringify({ From: '+15123371956', To: '+5214425921010', Body: 'Welcome To Cloud Love From Twilio Functions'})
    }).then(res => res).catch(err => err);
    callback(null, JSON.stringify(sms.data));
}