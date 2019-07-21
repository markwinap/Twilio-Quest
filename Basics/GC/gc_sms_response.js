exports.handler = (req, res) => {
    let message = xml([
        twiml({Message : {}}, 'Cloud Love From GC')
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