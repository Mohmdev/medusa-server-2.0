# GitHub Copilot Instructions for Medusa Server 2.0

## Project Overview

This repository is the backend for Medusa v2.0, which is primarily written in TypeScript (76.5%) and JavaScript (23.5%). The project structure includes custom modules, API routes, workflows, and subscribers, among others.

## Project Structure

medusa-server-2.0/
├── medusa-config.js
├── src/
│ ├── api/
│ │ ├── admin/
│ │ │ └── custom/
│ │ │ └── route.ts
│ │ ├── store/
│ │ │ └── hello-world/
│ │ │ └── route.ts
│ │ └── README.md
│ ├── modules/
│ │ ├── hello/
│ │ │ ├── service.ts
│ │ │ └── index.ts
│ │ ├── providers/
│ │ │ └── crypto/
│ │ │ └── index.ts
│ │ └── README.md
│ ├── scripts/
│ │ └── seed.ts
│ └── workflows/
│ └── example-workflow.ts
├── README.md
└── package.json

## General Guidelines

1. **Coding Language**: Prefer TypeScript for most implementations, including services, API routes, and workflows.
2. **File Naming**:
   - Use `index.ts` for module definitions.
   - Use `route.ts` for API routes.
   - Use descriptive names for custom scripts and modules.

## Modules

- **Service Creation**: Services should be created as TypeScript classes with relevant methods.
  ```typescript
  export default class HelloModuleService {
    getMessage() {
      return 'Hello, world!';
    }
  }
  ```
- **Module Definition**: Each module should have an `index.ts` file that exports the module definition.

  ```typescript
  import HelloModuleService from './service';
  import { Module } from '@medusajs/framework/utils';

  export const HELLO_MODULE = 'helloModuleService';

  export default Module(HELLO_MODULE, {
    service: HelloModuleService,
  });
  ```

- **Configuration**: Add new modules in `medusa-config.js`.

  ```javascript
  import { HELLO_MODULE } from './src/modules/hello';

  module.exports = defineConfig({
    // ...
    modules: {
      [HELLO_MODULE]: {
        resolve: './modules/hello',
      },
    },
  });
  ```

## API Routes

- **API Creation**: API routes should be defined in files named `route.ts` under the `src/api` directory.

  ```typescript
  import type { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

  export async function GET(req: MedusaRequest, res: MedusaResponse) {
    res.json({
      message: 'Hello world!',
    });
  }
  ```

- **HTTP Methods**: Support GET, POST, PUT, PATCH, DELETE, OPTIONS, and HEAD methods.
- **Path Parameters**: Use `[param]` format for route parameters.
  ```typescript
  export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const { productId } = req.params;
    res.json({
      message: `You're looking for product ${productId}`,
    });
  }
  ```

## Workflows

- **Workflow Creation**: Use the `@medusajs/framework/workflows-sdk` to create workflows.

  ```typescript
  import { createStep, createWorkflow, StepResponse } from '@medusajs/framework/workflows-sdk';

  const step1 = createStep('step-1', async () => {
    return new StepResponse(`Hello from step one!`);
  });

  const step2 = createStep('step-2', async ({ name }: { name: string }) => {
    return new StepResponse(`Hello ${name} from step two!`);
  });

  const myWorkflow = createWorkflow('hello-world', function (input) {
    const str1 = step1();
    step2(input);
    return {
      message: str1,
    };
  });

  export default myWorkflow;
  ```

## Subscribers

- **Subscriber Creation**: Define subscribers in the `src/subscribers` directory.

  ```typescript
  import { type SubscriberConfig } from '@medusajs/medusa';

  export default async function productCreateHandler() {
    console.log('A product was created');
  }

  export const config: SubscriberConfig = {
    event: 'product.created',
  };
  ```

## Best Practices

1. **Code Modularity**: Keep code modular and reusable.
2. **Documentation**: Include README files and comments for complex logic.
3. **Error Handling**: Implement comprehensive error handling in services, API routes, and workflows.
4. **Testing**: Write unit tests for critical functionalities.

## Configuration

- **Environment Variables**: Use environment variables for configuration settings in `medusa-config.js`.

  ```javascript
  import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils';

  module.exports = defineConfig({
    projectConfig: {
      // ...
    },
    admin: {
      // ...
    },
    store: {
      // ...
    },
    modules: {
      [Modules.MODULE_NAME]: {
        resolve: './path/to/module',
        options: {
          // ...
        },
      },
      // ...
    },
  });
  ```

By following these instructions, GitHub Copilot will be better equipped to generate code that aligns with the project's standards and practices.
