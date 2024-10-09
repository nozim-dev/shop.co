module.exports = [
  'strapi::errors',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'storage.yandexcloud.net/strapi-static'],
          'media-src': ["'self'", 'data:', 'blob:', 'storage.yandexcloud.net/strapi-static'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];