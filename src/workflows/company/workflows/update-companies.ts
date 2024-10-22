import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk";
import { ModuleUpdateCompany } from "@starter/types";
import { updateCompaniesStep } from "../steps";

export const updateCompaniesWorkflow = createWorkflow(
  "update-companies",
  function (input: ModuleUpdateCompany) {
    return new WorkflowResponse(updateCompaniesStep(input));
  }
);
