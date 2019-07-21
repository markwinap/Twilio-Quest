const url = require('url');
const MessagingResponse  = require('twilio').twiml.MessagingResponse;

exports.handler = async (req, res) => {
    const response = new MessagingResponse ();
    response.message('Cloud Love From GC');

    res.set('content-type', 'application/xml');
    res.status(200).send(response.toString());
};