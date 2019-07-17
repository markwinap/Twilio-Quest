exports.handler = function(context, event, callback) {
    /*
    context
    {"AUTH_TOKEN":"xxxxxxxxxx","ACCOUNT_SID":"ACxxxxxxxxx","DOMAIN_NAME":"flame-guppy-6267.twil.io"}
    event is automatically parsed from body, application/x-www-form-urlencoded ,  application/json or query parameters
    */
    
    const response = new Twilio.twiml.MessagingResponse ();
    response.message('Hello World');
	callback(null, response);
};