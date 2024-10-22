import { createWorkflow } from '@medusajs/workflows-sdk';
import { deleteCompaniesStep } from '../steps';
import type { ModuleDeleteCompany } from 'src/types/company';

export const deleteCompaniesWorkflow = createWorkflow('delete-companies', function (input: ModuleDeleteCompany) {
  deleteCompaniesStep([input.id]);
});
