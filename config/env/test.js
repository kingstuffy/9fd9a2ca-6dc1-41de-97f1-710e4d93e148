module.exports = {
  port: 1501,
  datastores: {
    default: {
      adapter: 'sails-disk',
      inMemoryOnly: true
    },
  },
  models: {
    migrate: 'drop',
    attributes: {
      id: { type: 'string', },
    },
  },
  security: {
    cors: {
      allRoutes: true,
      allowOrigins: '*',
      allowCredentials: false
    }
  },
  session: {
    secret: 'SECRET',
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  },

  sockets: {},
  log: {
    level: 'warn'
  },

  hooks: {
    grunt: false
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000,
  },

  // port: 80,
  custom: {
    pushNotifications: {
      newReviewChannel: 'test',
    },
    pusher: {
      appId: '',
      key: '',
      secret: '',
      cluster: '',
      encrypted: true,
    },
  },
};
