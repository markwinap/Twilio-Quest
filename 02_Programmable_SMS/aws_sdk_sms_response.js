const url = require('url');
const MessagingResponse  = require('twilio').twiml.MessagingResponse;

exports.handler = async (event) => {
    const body = url.parse(`https://amazonaws.com?${event.body}`, true);

    const response = new MessagingResponse ();
    response.message('Hello World');

    const response = {
        headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/xml'},
        statusCode: 200,
        body: esponse.toString()
    };
    return response;
};