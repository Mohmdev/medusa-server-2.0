import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk';
import { COMPANY_MODULE } from '../../../modules/company';
import type { ICompanyModuleService } from 'src/types/company';

export const deleteCompaniesStep = createStep(
  'delete-companies',
  async (id: string[], { container }) => {
    const companyModule = container.resolve<ICompanyModuleService>(COMPANY_MODULE);

    await companyModule.softDeleteCompanies(id);

    return new StepResponse(id, id);
  },
  async (companyId: string[], { container }) => {
    const companyModule = container.resolve<ICompanyModuleService>(COMPANY_MODULE);

    await companyModule.restoreCompanies(companyId);
  }
);
