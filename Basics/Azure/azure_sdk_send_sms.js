const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = async function (context, req) {
    let sms = await client.messages.create({body: 'Welcome To Cloud Love From MS Azure', from: '+15123371956', to: '+5214425921010'})
    .then(res => res).catch(err => err);
    context.res = {
        headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'},
        status: 200,
        body: JSON.stringify(sms)
    }
};
