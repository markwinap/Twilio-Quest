/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 * 
 * The app will automatically parse the content of body based on Content-Type
 */
exports.handler = (req, res) => {
    let message = xml([
        twiml({Say : {voice: 'alice'}}, 'Welcome To CloudLove')
    ]);
    res.set('content-type', 'application/xml');
    res.status(200).send(message);
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
/*
BASIC RESPONSE
let message = xml([
    twiml({Say : {voice: 'alice'}}, 'Welcome To CloudLove')
]);
<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="alice">Welcome To CloudLove</Say></Response>
*/

/*
NESTED
let message = xml([
        twiml({Dial : {}}, twiml({Number : {sendDigits: 'wwww1928'}}, '415-123-4567'))
]);
<?xml version="1.0" encoding="UTF-8"?><Response><Dial><Number sendDigits="wwww1928">415-123-4567</Number></Dial></Response>
*/

/*
MULTI VERBS AND NESTED
let message = xml([
        twiml({Gather : {action: '/process_gather.php', method: 'GET'}}, twiml({Say : {}}, 'Please enter your account number, followed by the pound sign')),
        twiml({Say : {}}, 'We didnt receive any input. Goodbye!')
]);
<?xml version="1.0" encoding="UTF-8"?><Response><Gather action="/process_gather.php" method="GET"><Say>Please enter your account number, followed by the pound sign</Say></Gather><Say>We didnt receive any input. Goodbye!</Say></Response>
*/