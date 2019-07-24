const url = require('url');

exports.handler = async (event) => {
    const body = url.parse(`https://amazonaws.com?${event.body}`, true);
    const response = {
        headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/xml'},
        statusCode: 200,
        body: xml([
           twiml({Message : {}}, `Hi! It looks like your phone number was born in {{ FromCountry }}`)
       ])
    };
    return response;
};
function xml(twimls) {
    return `<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response>${twimls.join('')}</Response>`;
}
function twiml(obj, nested){
    let tbase = '';
    let verb = Object.keys(obj)[0];
    Object.keys(obj[verb]).forEach( attribute => {
        tbase += ` ${attribute}="${obj[verb][attribute]}"`;
    });
  return `<${verb}${tbase}>${nested}</${verb}>`;
}