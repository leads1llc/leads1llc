export default ({ env }) => ({
  host: env('CORE_HOST', '0.0.0.0'),
  port: env.int('CORE_PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('ADMIN_BACKEND_URL', ''),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
