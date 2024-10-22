import { createWorkflow, WorkflowResponse } from '@medusajs/workflows-sdk';
import { updateCompaniesStep } from '../steps';
import type { ModuleUpdateCompany } from 'src/types/company';

export const updateCompaniesWorkflow = createWorkflow('update-companies', function (input: ModuleUpdateCompany) {
  return new WorkflowResponse(updateCompaniesStep(input));
});
