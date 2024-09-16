import type { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa';
import { Modules } from '@medusajs/utils';
import { INotificationModuleService, IProductModuleService } from '@medusajs/types';

// subscriber function
export default async function productCreateHandler({
  event: { data },
  container,
}: //
SubscriberArgs<{ id: string }>) {
  // notification module service
  const notificationModuleService: INotificationModuleService = container.resolve(Modules.NOTIFICATION);

  // product module service
  const productModuleService: IProductModuleService = container.resolve(Modules.PRODUCT);
  const productId = data.id;
  const product = await productModuleService.retrieveProduct(productId);

  await notificationModuleService.createNotifications([
    {
      to: 'mohammadr_m@outlook.com',
      template: 'product-created',
      channel: 'email',
      data,
      trigger_type: 'product.created',
      // attachments: { // optional var
      //   content: base64,
      //   content_type: 'image/png', // mime type
      //   filename: filename.ext,
      //   disposition: 'attachment or inline attachment',
      //   id: 'id', // only needed for inline attachment
      // },
    },
  ]);

  console.log(`The product ${product.title} was created`);
}

// subscriber config
export const config: SubscriberConfig = {
  event: 'product.created',
};
