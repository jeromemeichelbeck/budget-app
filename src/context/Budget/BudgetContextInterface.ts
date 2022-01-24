import { Budget, BudgetDTO } from '../../types/Budget'
import { Expense } from '../../types/Expense'

export interface BudgetContextInterface {
  budgets: Budget[]
  selectedBudgetId?: Budget['id']
  getBudgetById: (budgetId: Budget['id']) => Budget | undefined
  addOrEditBudget: (newBudget: BudgetDTO) => void
  deleteBudgetById: (budgetId: Budget['id']) => void
  getExpensesByBudgetId: (budgetId?: Budget['id']) => Expense[]
  showAddOrEditBudgetForm: boolean
  openAddOrEditBudgetForm: (budgetId?: Budget['id']) => void
  closeAddOrEditBudgetForm: () => void
  showConfirmDeleteBudget: boolean
  openConfirmDeleteBudget: (budgetId: Budget['id']) => void
  closeConfirmDeleteBudget: () => void
}
