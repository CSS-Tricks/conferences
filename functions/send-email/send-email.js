const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);

exports.handler = function(event, context, callback) {
  client.transmissions
    .send({
      content: {
        from: 'chris@css-tricks.com',
        subject: 'Hello, World!',
        html:
          "<html><body><p>Testing SparkPost - the world's most awesomest email service!</p></body></html>"
      },
      recipients: [{ address: 'chriscoyier@gmail.com' }]
    })
    .then(data => {
      callback(null, {
        statusCode: 301,
        headers: {
          "location" : "https://conferences.css-tricks.com"
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
