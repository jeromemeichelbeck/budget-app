import { Budget } from './Budget'

export type Expense = {
  id: string
  budgetId: Budget['id'] | null
  amount: number
  description: string
}

export interface ExpenseDTO {
  id?: Expense['id']
  amount: Expense['amount']
  description: Expense['description']
}
