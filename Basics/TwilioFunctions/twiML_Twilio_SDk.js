exports.handler = function(context, event, callback) {
    /*
    context
    {"AUTH_TOKEN":"xxxxxxxxxx","ACCOUNT_SID":"ACxxxxxxxxx","DOMAIN_NAME":"flame-guppy-6267.twil.io"}
    event is automatically parsed from body, application/x-www-form-urlencoded ,  application/json or query parameters
    */
	let response = new Twilio.twiml.VoiceResponse();
    response.say({
        voice: 'alice',
    }, 'Welcome To CloudLove!');
	callback(null, twiml);
};