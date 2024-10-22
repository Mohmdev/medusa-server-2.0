import { createWorkflow, WorkflowResponse } from '@medusajs/workflows-sdk';
import { updateQuotesStep } from '../steps/update-quotes';
import type { ModuleQuote, ModuleUpdateQuote } from 'src/types/quote';

/*
  A workflow that updates a quote. 
*/
export const updateQuotesWorkflow = createWorkflow(
  'update-quotes-workflow',
  function (input: ModuleUpdateQuote[]): WorkflowResponse<ModuleQuote[]> {
    return new WorkflowResponse(updateQuotesStep(input));
  }
);
