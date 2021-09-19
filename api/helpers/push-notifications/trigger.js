const Pusher = require('pusher');

const config = sails.config.custom.pusher;
const pusher = new Pusher(config);


module.exports = {
  friendlyName: 'Trigger push notifications',
  description: 'Trigger push notifications',
  inputs: {
    channel: {
      friendlyName: 'Channel',
      description: 'Channel',
      type: 'string',
      required: true,
    },
    event: {
      friendlyName: 'Event',
      description: 'Event',
      type: 'string',
      required: true,
    },
    data: {
      friendlyName: 'Data',
      description: 'Data',
      type: 'json',
    },
  },
  exits: {
    success: {
      outputFriendlyName: 'Trigger Response',
      description: 'Trigger Response',
    },
  },
  sync: true,
  fn(inputs, exits) {
    const { channel, event, data } = inputs;
    pusher.trigger(channel, event, data);
    exits.success();
  },
};
