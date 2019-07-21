const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.handler = async (req, res) => {
    let sms = await client.messages.create({body: 'Welcome To Cloud Love From GC', from: '+15123371956', to: '+5214425921010'})
    .then(res => res).catch(err => err);

    res.set('content-type', 'application/json');
    res.status(200).send(JSON.stringify(sms));
};