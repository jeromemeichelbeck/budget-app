import { Budget } from './Budget'

export type Expense = {
  id: string
  budgetId: Budget['id'] | null
  amount: number
  description: string
}

export interface ExpenseDTO {
  amount: Expense['amount']
  description: Expense['description']
}
