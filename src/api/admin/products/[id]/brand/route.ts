import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  // Retrieve Brand of Product
  const {
    data: [product],
  } = await query.graph({
    entity: 'product',
    fields: ['brand.*'],
    filters: {
      id: req.params.id,
    },
  });

  // Retrieve Products of a Brand
  const {
    data: [brand],
  } = await query.graph({
    entity: 'brand',
    fields: ['products.*'],
    filters: {
      id: req.params.id,
    },
  });

  res.json({ brand: product.brand });
};
