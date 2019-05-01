const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);
const querystring = require('querystring');

exports.handler = function(event, context, callback) {
  client.transmissions
    .send({
      content: {
        from: 'chris@css-tricks.com',
        subject: `conf`,
        html: `testing`
      },
      recipients: [{ address: 'mat@matmarquis.com' }]
    })
    .then(data => {
      callback(null, {
        statusCode: 200,
        body: `Message sent!`
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 500,
        body: `Sorry, something went wrong. ${err}`
      });
    });
};
