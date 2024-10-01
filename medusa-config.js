import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils';

const NODE_ENV = process.env.NODE_ENV || 'development';
loadEnv(NODE_ENV, process.cwd());

module.exports = defineConfig({
  projectConfig: {
    workerMode: process.env.WORKER_MODE || 'shared',
    redisUrl: process.env.REDIS_URL,
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: NODE_ENV ? { ssl: { rejectUnauthorized: false } } : {},
    http: {
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
      storeCors: process.env.STORE_CORS || 'http://localhost:8000',
      adminCors: process.env.ADMIN_CORS || 'http://localhost:9000',
      authCors: process.env.AUTH_CORS || 'http://localhost:8000,http://localhost:9000',
    },
  },
  admin: {
    path: '/dashboard',
    outDir: `./build.admin`,
    backendUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
    storefrontUrl: process.env.STORE_CORS || 'http://localhost:8000',
    //
    // Optional: if set to `true`, the admin frontend will not be built.
    // Use this where you are not serving the admin (e.g. workerMode: 'worker' and or 'server')
    disable: process.env.DISABLE_MEDUSA_ADMIN === 'true' || false,
  },
  modules: {
    [Modules.CACHE]: {
      resolve: '@medusajs/medusa/cache-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    [Modules.EVENT_BUS]: {
      resolve: '@medusajs/medusa/event-bus-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    [Modules.WORKFLOW_ENGINE]: {
      resolve: '@medusajs/medusa/workflow-engine-redis',
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
  },
});
