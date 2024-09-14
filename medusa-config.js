import { loadEnv, defineConfig, Modules } from '@medusajs/utils';
// import { defineRouteConfig, defineWidgetConfig } from '@medusajs/admin-sdk';

loadEnv(process.env.NODE_ENV, process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: process.env.NODE_ENV !== 'development' ? { ssl: { rejectUnauthorized: false } } : {},
    redisUrl: process.env.REDIS_URL,
    workerMode: 'shared',
    http: {
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      authMethodsPerActor: {
        user: ['emailpass', 'me'],
        users: ['emailpass', 'me'],
        customer: ['emailpass', 'google', 'outlook'],
      },
    },
  },
  admin: {
    path: '/dashboard',
    backendUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
    outDir: `./build.admin`,
    storefrontUrl: process.env.STORE_CORS || 'http://localhost:8000',
  },
  modules: {
    [Modules.EVENT_BUS]: {
      resolve: '@medusajs/event-bus-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    [Modules.CACHE]: {
      resolve: '@medusajs/cache-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    [Modules.WORKFLOW_ENGINE]: {
      resolve: '@medusajs/workflow-engine-redis',
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
    [Modules.AUTH]: {
      resolve: '@medusajs/auth',
      options: {
        providers: [
          {
            resolve: '@medusajs/auth-emailpass',
            id: 'emailpass',
            options: {
              // provider options...
            },
          },
        ],
      },
    },
  },
});
