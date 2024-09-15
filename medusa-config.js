import { loadEnv, defineConfig, Modules } from '@medusajs/utils';
// import { defineRouteConfig, defineWidgetConfig } from '@medusajs/admin-sdk';

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
      adminCors: process.env.ADMIN_CORS || 'http://localhost:7001,http://localhost:9000',
      authCors: process.env.AUTH_CORS || 'http://localhost:7001,http://localhost:8000,http://localhost:9000',
      authMethodsPerActor: {
        user: ['emailpass'],
        users: ['emailpass'],
        customer: ['emailpass'],
      },
    },
    // Optional
    httpCompression: {
      enabled: true,
      level: 6, // performance and compression ratio (0-9): Lower values = Faster but less compression | Higher values = Slower but better compression
      memLevel: 7, // compression algorithm memory usage (1-9): Higher values = use 'more memory' but result in faster compression and better compression ratios
      threshold: 1024, // minimum size (in bytes) for a response to be compressed
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
    [Modules.FILE]: {
      resolve: '@medusajs/file',
      options: {
        providers: [
          {
            resolve: '@medusajs/file-s3',
            id: 's3',
            // MinIO specfic configuration
            options: {
              endpoint: process.env.S3_ENDPOINT,
              bucket: process.env.S3_BUCKET,
              access_key_id: process.env.S3_ACCESS_KEY,
              secret_access_key: process.env.S3_SECRET_KEY,
              file_url: `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}`,
              region: process.env.S3_REGION || 'us-east-1', // dummy region as setting the region is optional in MinIO bucket configuration
              additional_client_config: {
                forcePathStyle: true, // This is mandatory for MinIO else the bucket name will be prefixed to the URL
              },
              // other S3 specific configuration...
            },
          },
        ],
      },
    },
    [Modules.NOTIFICATION]: {
      resolve: '@medusajs/notification',
      options: {
        providers: [
          {
            resolve: '@medusajs/notification-sendgrid',
            id: 'sendgrid',
            options: {
              channels: ['email'], // Only one provider can be defined per channel
              api_key: process.env.SENDGRID_API_KEY,
              from: process.env.SENDGRID_FROM,
            },
          },
        ],
      },
    },
  },
});
