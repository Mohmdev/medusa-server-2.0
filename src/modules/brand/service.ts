import { MedusaService } from '@medusajs/framework/utils';
import { Brand } from './models/brand';
import { BrandClientOptions, BrandClient } from './services';

type InjectedDependencies = {
  brandClient: BrandClient;
};

class BrandModuleService extends MedusaService({
  Brand,
}) {
  public client: BrandClient;

  constructor({ brandClient }: InjectedDependencies) {
    super(...arguments);

    this.client = brandClient;
  }
}

export default BrandModuleService;

export { BrandClientOptions };
