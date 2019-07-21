const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.handler = async (event) => {
    let sms = await client.messages.create({body: 'Welcome To Cloud Love From AWS', from: '+15123371956', to: '+5214425921010'})
    .then(res => res).catch(err => err);
    const response = {
        headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'},
        statusCode: 200,
        body: JSON.stringify(sms)
    };
    return response;
};