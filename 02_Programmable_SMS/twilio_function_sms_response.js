exports.handler = function(context, event, callback) {
    /*
    context
    {"AUTH_TOKEN":"xxxxxxxxxx","ACCOUNT_SID":"ACxxxxxxxxx","DOMAIN_NAME":"flame-guppy-6267.twil.io"}
    event is automatically parsed from body, application/x-www-form-urlencoded ,  application/json or query parameters
    */
    const response = xml([
        twiml({Message : {}}, 'Welcome To CloudLove')
    ])
	callback(null, response);
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