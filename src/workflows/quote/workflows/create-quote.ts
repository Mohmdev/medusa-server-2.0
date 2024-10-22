import { createWorkflow, WorkflowResponse } from '@medusajs/workflows-sdk';
import { createQuotesStep } from '../steps/create-quotes';
import type { ModuleCreateQuote, ModuleQuote } from 'src/types/quote';

/*
  A workflow that creates a quote entity that manages the quote lifecycle.
*/
export const createQuotesWorkflow = createWorkflow(
  'create-quotes-workflow',
  function (input: ModuleCreateQuote[]): WorkflowResponse<ModuleQuote[]> {
    return new WorkflowResponse(createQuotesStep(input));
  }
);
