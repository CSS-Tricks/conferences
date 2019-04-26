const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);
const querystring = require('querystring');

exports.handler = function(event, context, callback) {
  const post  = querystring.parse(event.body);
  let address = post['email'];

  if( !post || event.httpMethod !== "POST" ) {
    return;
  }

  client.transmissions
    .send({
      content: {
        from: 'chris@css-tricks.com',
        subject: 'Hello, World!',
        html:
          "<html><body><p>Testing SparkPost - the world's most awesomest email service!</p></body></html>"
      },
      recipients: [{ address: remindme }]
    })
    .then(data => {
      callback(null, {
        statusCode: 301,
        headers: {
          "location" : event.headers.referer
        },
        body: null
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 200,
        body: `Sorry, something went wrong.`
      });
    });
};
