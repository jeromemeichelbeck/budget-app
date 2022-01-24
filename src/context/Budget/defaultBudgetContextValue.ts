import { BudgetContextInterface } from './BudgetContextInterface'

export const defaultBudgetContextValue: BudgetContextInterface = {
  budgets: [],
  selectedBudgetId: undefined,
  getBudgetById: () => undefined,
  addOrEditBudget: () => {},
  deleteBudgetById: () => {},
  getExpensesByBudgetId: () => [],
  showAddOrEditBudgetForm: false,
  openAddOrEditBudgetForm: () => {},
  closeAddOrEditBudgetForm: () => {},
  showConfirmDeleteBudget: false,
  openConfirmDeleteBudget: () => {},
  closeConfirmDeleteBudget: () => {},
}
