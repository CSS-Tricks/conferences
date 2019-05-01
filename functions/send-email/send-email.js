const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);
const { parse } = require('querystring');

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';

    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

exports.handler = function(event, context, callback) {
  const post = querystring.parse(event.body);

  if (!post || event.httpMethod !== 'POST') {
    return;
  }

  collectRequestData(req, result => {
    client.transmissions
      .send({
        content: {
          from: 'chris@css-tricks.com',
          subject: `${ result.conf }`,
          html: `test`
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
  });

 
};
