const { schedule } = require('@netlify/functions');

const handler = async function(event, context) {
  fetch('https://api.netlify.com/build_hooks/5c587ed79f73870173703311', {
    method: 'POST'
  });
  return {
    statusCode: 200
  };
};

module.exports.handler = schedule('@daily', handler);
