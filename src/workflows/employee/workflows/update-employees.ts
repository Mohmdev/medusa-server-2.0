import { createWorkflow, WorkflowData, WorkflowResponse } from '@medusajs/workflows-sdk';
import { removeAdminRoleStep, updateEmployeesStep } from '../steps';
import { when } from '@medusajs/framework/workflows-sdk';
import type { ModuleUpdateEmployee, QueryEmployee } from 'src/types/company';

export const updateEmployeesWorkflow = createWorkflow(
  'update-employees',
  (input: WorkflowData<ModuleUpdateEmployee>): WorkflowResponse<QueryEmployee> => {
    const updatedEmployee = updateEmployeesStep(input);

    when(updatedEmployee, ({ is_admin }) => {
      return is_admin === false;
    }).then(() => {
      removeAdminRoleStep({
        email: updatedEmployee.customer.email,
      });
    });

    return new WorkflowResponse(updatedEmployee);
  }
);
