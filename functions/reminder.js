/*
exports.handler = function(event, context, callback) {
  const SparkPost = require('sparkpost');
  const client = new SparkPost( process.env.SPARKPOST );
  const params = event.queryStringParameters;

  client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: 'testing@sparkpostbox.com',
      subject: 'Hello, World!',
      html:`<html><body><p>Hi. This seems to be working.</p></body></html>`
    },
    recipients: [
      {
        address: 'mat@matmarquis.com'
      }
    ]
  })
  .then(data => {
    console.log('Woohoo! You just sent your first mailing!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });
};*/

exports.handler = function(event, context, callback) {
  const params = event.queryStringParameters;

  callback(null, {
    statusCode: 200,
    body: `<h1>${ params.title }</h1><p>${ params.lede }</p>`
  });
};
