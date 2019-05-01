const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);
const querystring = require('querystring');

exports.handler = function(event, context, callback) {
  const post = querystring.parse(event.body);

  const email = post['email'],
    conf = post['conf'],
    url = post['url'],
    loc = post['loc'],
    dates = post['dates'],
    desc = post['desc'],
    coc = post['coc'];

  const fakeconf = "POST Conference";

  if (!post || event.httpMethod !== 'POST') {
    return;
  }

  client.transmissions
    .send({
      content: {
        from: 'chris@css-tricks.com',
        subject: `${fakeconf}`,
        html: `${ event.body }`
      },
      recipients: [{ address: "mat@matmarquis.com" }]
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
