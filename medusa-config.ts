import { loadEnv, defineConfig } from '@medusajs/framework/utils';
const { QUOTE_MODULE } = require('./src/modules/quote');

const NODE_ENV = process.env.NODE_ENV || 'development';
loadEnv(NODE_ENV, process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: process.env.NODE_ENV !== 'development' ? { ssl: { rejectUnauthorized: false } } : {},
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    workerMode: (process.env.WORKER_MODE as 'shared' | 'worker' | 'server') || 'shared',
    http: {
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
      storeCors: process.env.STORE_CORS || 'http://localhost:8000',
      adminCors: process.env.ADMIN_CORS || 'http://localhost:9000',
      authCors: process.env.AUTH_CORS || 'http://localhost:8000,http://localhost:9000',
      // Optional
      compression: {
        enabled: true,
        level: 6, // performance and compression ratio (0-9): Lower values = Faster but less compression | Higher values = Slower but better compression
        memLevel: 7, // compression algorithm memory usage (1-9): Higher values = use 'more memory' but result in faster compression and better compression ratios
        threshold: 1024, // minimum size (in bytes) for a response to be compressed
      },
    },
  },
  admin: {
    path: '/dashboard',
    backendUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
    storefrontUrl: process.env.STORE_CORS || 'http://localhost:8000',
    //
    // Optional: if set to `true`, the admin frontend will not be built.
    // Use this where you are not serving the admin (e.g. workerMode: 'worker' and or 'server')
    disable: process.env.DISABLE_MEDUSA_ADMIN === 'true' || false,
  },
  modules: [
    {
      resolve: '@medusajs/medusa/cache-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: '@medusajs/medusa/event-bus-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: '@medusajs/medusa/workflow-engine-redis',
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
    {
      resolve: '@medusajs/medusa/file',
      options: {
        providers: [
          {
            resolve: '@medusajs/medusa/file-s3',
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
    {
      // Company
      resolve: './modules/company',
    },
    {
      resolve: './modules/quote',
    },
  ],
});
