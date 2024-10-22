import { createWorkflow, WorkflowResponse } from '@medusajs/workflows-sdk';
import { createCompaniesStep } from '../steps';
import type { ModuleCreateCompany } from 'src/types/company';

export const createCompaniesWorkflow = createWorkflow('create-company', function (input: ModuleCreateCompany) {
  return new WorkflowResponse(createCompaniesStep(input));
});
