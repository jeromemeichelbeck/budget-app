import { Budget } from '../../types/Budget'
import { Expense, ExpenseDTO } from '../../types/Expense'

export interface ExpenseContextInterface {
  expenses: Expense[]
  selectedExpenseId?: Expense['id']
  getExpenseById: (expenseId: Expense['id']) => Expense | undefined
  addOrEditExpense: (
    newExpense: ExpenseDTO,
    budgetId: Budget['id'] | null
  ) => void
  deleteExpenseById: (expenseId: Expense['id']) => void
  getBudgetByExpenseId: (expenseId: Expense['id']) => Budget | undefined
  showViewExpenses: boolean
  openViewExpenses: (budgetId?: Budget['id']) => void
  closeViewExpenses: () => void
  showAddOrEditExpenseForm: boolean
  openAddOrEditExpenseForm: (budgetId?: Budget['id']) => void
  closeAddOrEditExpenseForm: () => void
  showConfirmDeleteExpense: boolean
  openConfirmDeleteExpense: (expenseId: Expense['id']) => void
  closeConfirmDeleteExpense: () => void
}
