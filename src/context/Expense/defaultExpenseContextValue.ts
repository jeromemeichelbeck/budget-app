import { ExpenseContextInterface } from './ExpenseContextInterface'

export const defaultExpenseContextValue: ExpenseContextInterface = {
  expenses: [],
  selectedExpenseId: undefined,
  getExpenseById: () => undefined,
  addOrEditExpense: () => {},
  deleteExpenseById: () => {},
  getBudgetByExpenseId: () => undefined,
  showViewExpenses: false,
  openViewExpenses: () => {},
  closeViewExpenses: () => {},
  showAddOrEditExpenseForm: false,
  openAddOrEditExpenseForm: () => {},
  closeAddOrEditExpenseForm: () => {},
  showConfirmDeleteExpense: false,
  openConfirmDeleteExpense: () => {},
  closeConfirmDeleteExpense: () => {},
}
