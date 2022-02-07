const { schedule } = require('@netlify/functions');

const handler = async function(event, context) {
  fetch(`https://api.netlify.com/build_hooks/${process.env.BUILD_SECRET}`, {
    method: 'POST'
  });
  return {
    statusCode: 200
  };
};

module.exports.handler = schedule('@daily', handler);
