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
      console.log('Woohoo! You just sent your first mailing!');
      console.log(data);
    })
    .catch(err => {
      console.log('Whoops! Something went wrong');
      console.log(err);
    });
};
