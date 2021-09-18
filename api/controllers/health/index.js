module.exports = {
  friendlyName: 'Health Check',
  description: 'Health check endpoint',
  inputs: {},
  exits: {
    success: {
      statusCode: 200,
      friendlyName: 'Health check response.',
      description: 'Should return 200 OK.',
      outputExample: {
        'message': 'OK'
      },
    },
  },
  fn: async function (inputs, exits) {
    return exits.success();
  }
};
