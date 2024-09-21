select and export all products from the default sales channel

```sh
212.154.4.234 - - [21/Sep/2024:07:00:36 +0000] "GET /admin/products?limit=20&offset=0&sales_channel_id%5B0%5D=sc_01J7DDW354BZ0RAP3D9SVAB6R5 HTTP/1.1" 304 - "https://medusa--server.up.railway.app/dashboard/products?sales_channel_id=sc_01J7DDW354BZ0RAP3D9SVAB6R5" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
212.154.4.234 - - [21/Sep/2024:07:00:36 +0000] "GET /admin/notifications?limit=1&offset=0&fields=created_at HTTP/1.1" 304 - "https://medusa--server.up.railway.app/dashboard/products?sales_channel_id=sc_01J7DDW354BZ0RAP3D9SVAB6R5" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
212.154.4.234 - - [21/Sep/2024:07:00:39 +0000] "GET /admin/notifications?limit=1&offset=0&fields=created_at HTTP/1.1" 304 - "https://medusa--server.up.railway.app/dashboard/products/export?sales_channel_id=sc_01J7DDW354BZ0RAP3D9SVAB6R5" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
212.154.4.234 - - [21/Sep/2024:07:00:40 +0000] "POST /admin/products/export?limit=20&offset=0&sales_channel_id%5B0%5D=sc_01J7DDW354BZ0RAP3D9SVAB6R5 HTTP/1.1" 202 47 "https://medusa--server.up.railway.app/dashboard/products/export?sales_channel_id=sc_01J7DDW354BZ0RAP3D9SVAB6R5" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
2024-09-21T07:00:42.536158629Z [ERRO] export-products:get-all-products:invoke - Trying to query by not existing property Product.sales_channel_id
Error: Trying to query by not existing property Product.sales_channel_id
    at /app/node_modules/@mikro-orm/knex/query/CriteriaNode.js:28:27
    at Array.forEach (<anonymous>)
    at new CriteriaNode (/app/node_modules/@mikro-orm/knex/query/CriteriaNode.js:23:17)
    at new ObjectCriteriaNode (/app/node_modules/@mikro-orm/knex/query/ObjectCriteriaNode.js:10:1)
    at Function.createObjectNode (/app/node_modules/@mikro-orm/knex/query/CriteriaNodeFactory.js:40:22)
    at Function.createNode (/app/node_modules/@mikro-orm/knex/query/CriteriaNodeFactory.js:20:25)
    at Function.createObjectItemNode (/app/node_modules/@mikro-orm/knex/query/CriteriaNodeFactory.js:51:25)
    at /app/node_modules/@mikro-orm/knex/query/CriteriaNodeFactory.js:42:28
    at Array.reduce (<anonymous>)
    at Function.createObjectNode (/app/node_modules/@mikro-orm/knex/query/CriteriaNodeFactory.js:41:45) timestamp="2024-09-21 07:00:42"
212.154.4.234 - - [21/Sep/2024:07:00:43 +0000] "GET /admin/notifications?limit=1&offset=0&fields=created_at HTTP/1.1" 304 - "https://medusa--server.up.railway.app/dashboard/products" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
212.154.4.234 - - [21/Sep/2024:07:00:47 +0000] "GET /admin/notifications?limit=1&offset=0&fields=created_at HTTP/1.1" 304 - "https://medusa--server.up.railway.app/dashboard/products" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
```

node_modules/@medusajs/notification/dist/services/notification-module-service
C:\Users\Moham\Desktop\MohmDev\Medusajs\medusa-2.0_server\node_modules\@medusajs\notification\dist\services\notification-module-service.d.ts

```sh
export-products:notify-on-failure:compensate - Could not find a notification provider for channel: feed for notification id noti_01J89RP403VBHTZBEHR4QH86KA
Error: Could not find a notification provider for channel: feed for notification id noti_01J89RP403VBHTZBEHR4QH86KA
    at promiseAll (/app/node_modules/@medusajs/utils/src/common/promise-all.ts:31:13)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async NotificationModuleService.createNotifications_ (/app/node_modules/@medusajs/notification/dist/services/notification-module-servicTZBEHR4QH86KAe.js:87:13)
    at async NotificationModuleService.createNotifications (/app/node_modules/@medusajs/notification/dist/services/notification-module-service.js:29:38)
    at async NotificationModuleService.descriptor.value (/app/node_modules/@medusajs/utils/src/modules-sdk/decorators/inject-into-context.ts:2e.js:87:13)7:14)                                                                                                                                         .js:29:38)
    at async NotificationModuleService.descriptor.value (/app/node_modules/@medusajs/utils/src/modules-sdk/decorators/emit-events.ts:26:22)   7:14)
    at async Proxy.<anonymous> (/app/node_modules/@medusajs/orchestration/src/workflow/local-workflow.ts:129:20)
    at async Object.<anonymous> (/app/node_modules/@medusajs/core-flows/dist/notification/steps/notify-on-failure.js:19:5)
    at async Object.handler.compensate (/app/node_modules/@medusajs/workflows-sdk/src/utils/composer/helpers/create-step-handler.ts:102:26)
    at async DistributedTransaction.handler (/app/node_modules/@medusajs/orchestration/src/workflow/workflow-manager.ts:214:16) timestamp="2024-09-21 07:45:35"
```
