const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.handler = async (req, res) => {
    let sms = await client.messages.create({
            body: `Greetings! The current time is: ${new Date().toString()} 8UFQQABJSD88M21`,
            from: '+15123371956',
            to: '+12092104311'
        })
        .then(res => res).catch(err => err);

    res.set('content-type', 'application/json');
    res.status(200).send(JSON.stringify(sms));
};