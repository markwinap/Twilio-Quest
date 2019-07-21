const url = require('url');
const MessagingResponse  = require('twilio').twiml.MessagingResponse;

module.exports = async function (context, req) {
    const body = url.parse(`https://functions.azure.com?${req.rawBody}`, true);
    const response = new MessagingResponse ();
    response.message('Cloud Love From MS Azure');

    context.res = {
        headers: {'content-type': 'application/xml'},
        status: 200,
        body: response.toString()
    }
};
