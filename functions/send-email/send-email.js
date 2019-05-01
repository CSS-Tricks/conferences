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

  if (!post || event.httpMethod !== 'POST') {
    return;
  }

  client.transmissions
    .send({
      content: {
        from: 'chris@css-tricks.com',
        subject: `${conf}`,
        html: `<html>
  <body>
    <h1 style="margin-bottom:0"><a href="${url}">${conf}</a></h1>
    <h2 style="margin:.15em">${loc}</h2>
    <p style="margin-top:0;font-weight:bold">${dates}</p>

    ${desc}

    <p><a href="${url}">${conf} →</a></p>
    <p><a href="${coc}" style="font-size:.8em;">Code of Conduct</a></p>
  </body>
</html>`
      },
      recipients: [{ address: email }]
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
