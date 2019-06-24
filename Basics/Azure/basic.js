const url = require('url');

module.exports = async function (context, req) {
    /*
    BASIC RESPONSE
    context.res = {
        status: 200,
        body: xml([
            twiml({Say : {voice: 'alice'}}, 'Welcome To CloudLove')
        ])
    }
    <?xml version="1.0" encoding="UTF-8"?><Response><Say voice="alice">Welcome To CloudLove</Say></Response>
    */

    /*
    NESTED
    context.res = {
        status: 200,
        body: xml([
            twiml({Dial : {}}, twiml({Number : {sendDigits: 'wwww1928'}}, '415-123-4567'))
        ])
    }
    <?xml version="1.0" encoding="UTF-8"?><Response><Dial><Number sendDigits="wwww1928">415-123-4567</Number></Dial></Response>
    */

    /*
    MULTI VERBS AND NESTED
    context.res = {
        status: 200,
        body: xml([
            twiml({Gather : {action: '/process_gather.php', method: 'GET'}}, twiml({Say : {}}, 'Please enter your account number, followed by the pound sign')),
            twiml({Say : {}}, 'We didnt receive any input. Goodbye!')
        ])
    }
    <?xml version="1.0" encoding="UTF-8"?><Response><Gather action="/process_gather.php" method="GET"><Say>Please enter your account number, followed by the pound sign</Say></Gather><Say>We didnt receive any input. Goodbye!</Say></Response>
    */
   const body = url.parse(`https://functions.azure.com?${req.rawBody}`, true);
   context.res = {
       status: 200,
       body: xml([
           twiml({Say : {voice: 'alice'}}, 'Welcome To CloudLove')
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
