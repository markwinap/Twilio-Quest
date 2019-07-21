const client = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

exports.handler = function(context, event, callback) {
    main(context, event, callback);
};
async function main(context, event, callback){
    let sms = await client.messages.create({
        body: 'Welcome To Cloud Love From Twilio Functions',
        to: '+5214425921010',
        from: '+15123371956'
    })
    .then(res => res).catch(err => err);
    callback(null, sms.sid);
}