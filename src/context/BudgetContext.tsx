import { createContext, FC, useContext } from 'react'
import { v4 as createId } from 'uuid'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Budget, BudgetDTO } from '../types/Budget'
import { Expense, ExpenseDTO } from '../types/Expense'
import { Storage } from '../types/Storage'

const BudgetContext = createContext({})

export const useBudget = () => {
  return useContext(BudgetContext)
}

export const BudgetProvider: FC = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage<Budget[]>(Storage.BUDGETS, [])
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    Storage.EXPENSES,
    []
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
