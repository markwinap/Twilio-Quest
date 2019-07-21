const url = require('url');
const MessagingResponse  = require('twilio').twiml.MessagingResponse;

exports.handler = async (event) => {
    const body = url.parse(`https://amazonaws.com?${event.body}`, true);

    const response = new MessagingResponse ();
    response.message('Cloud Love From AWS');

    const response = {
        headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/xml'},
        statusCode: 200,
        body: response.toString()
    };
    return response;
};