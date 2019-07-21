const url = require('url');

module.exports = async function (context, req) {
   const body = url.parse(`https://functions.azure.com?${req.rawBody}`, true);
   context.res = {
        headers: {'content-type': 'application/xml'},
        status: 200,
        body: xml([
            twiml({Message : {}}, 'Welcome To CloudLove From MS Azure')
        ])
   }
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