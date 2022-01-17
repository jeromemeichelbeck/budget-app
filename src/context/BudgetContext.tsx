import { createContext, FC, useContext } from 'react'
import { v4 as createId } from 'uuid'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Budget, BudgetDTO } from '../types/Budget'
import { Expense, ExpenseDTO } from '../types/Expense'
import { Storage } from '../types/Storage'

interface BudgetContextInterface {
  budgets: Budget[]
  expenses: Expense[]
  getBudgetExpenses: (budgetId: Budget['id']) => Expense[]
  addBudget: (newBudget: BudgetDTO) => void
  deleteBudgetById: (budgetId: Budget['id']) => void
  addExpense: (newExpense: ExpenseDTO, budgetId: Budget['id']) => void
  deleteExpenseById: (expenseId: Expense['id']) => void
}

const defaultBudgetContectValue: BudgetContextInterface = {
  budgets: [],
  expenses: [],
  getBudgetExpenses: (budgetId: Budget['id']) => [],
  addBudget: (newBudget: BudgetDTO) => {},
  deleteBudgetById: (budgetId: Budget['id']) => {},
  addExpense: (newExpense: ExpenseDTO, budgetId: Budget['id']) => {},
  deleteExpenseById: (expenseId: Expense['id']) => {},
}

const BudgetContext = createContext(defaultBudgetContectValue)

export const useBudgets = () => {
  return useContext<BudgetContextInterface>(BudgetContext)
}

export const BudgetProvider: FC = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage<Budget[]>(
    Storage.BUDGETS,
    defaultBudgetContectValue.budgets
  )
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    Storage.EXPENSES,
    defaultBudgetContectValue.expenses
  )

  const getBudgetExpenses = (budgetId: Budget['id']) =>
    expenses.filter((expense) => expense.budgetId === budgetId)

  const addBudget = (newBudget: BudgetDTO) => {
    setBudgets((currentBudgets) => {
      if (
        currentBudgets.some(
          (budget) => budget.name.toLowerCase() === newBudget.name.toLowerCase()
        )
      ) {
        return currentBudgets
      }
      return [...currentBudgets, { ...newBudget, id: createId() }]
    })
  }

  const deleteBudgetById = (budgetId: Budget['id']) => {
    setExpenses((currentExpenses) =>
      currentExpenses.map((expense) => ({
        ...expense,
        budgetId: expense.budgetId === budgetId ? null : expense.budgetId,
      }))
    )
    setBudgets((currentBudgets) =>
      currentBudgets.filter((budget) => budget.id !== budgetId)
    )
  }

  const addExpense = (expense: ExpenseDTO, budgetId: Budget['id']) => {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { ...expense, id: createId(), budgetId },
    ])
  }

  const deleteExpenseById = (expenseId: Expense['id']) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId)
    )
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteExpenseById,
        deleteBudgetById,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
