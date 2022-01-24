import { createContext, FC, useContext, useState } from 'react'
import { v4 as createId } from 'uuid'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Budget, BudgetDTO } from '../types/Budget'
import { Expense, ExpenseDTO } from '../types/Expense'
import { Storage } from '../types/Storage'
import { BudgetContextInterface } from './Budget/BudgetContextInterface'
import { defaultBudgetContextValue } from './Budget/defaultBudgetContextValue'
import { defaultExpenseContextValue } from './Expense/defaultExpenseContextValue'
import { ExpenseContextInterface } from './Expense/ExpenseContextInterface'

interface AppContextInterface {
  budget: BudgetContextInterface
  expense: ExpenseContextInterface
}

const defaultAppContextValue: AppContextInterface = {
  budget: defaultBudgetContextValue,
  expense: defaultExpenseContextValue,
}

const AppContext = createContext(defaultAppContextValue)

export const useAppContext = () => {
  return useContext<AppContextInterface>(AppContext)
}

export const AppProvider: FC = ({ children }) => {
  /**
   * Budgets
   */

  const [budgets, setBudgets] = useLocalStorage<
    BudgetContextInterface['budgets']
  >(Storage.BUDGETS, defaultBudgetContextValue.budgets)

  const [selectedBudgetId, selectBudgetId] = useState<
    BudgetContextInterface['selectedBudgetId']
  >(defaultBudgetContextValue.selectedBudgetId)

  const getBudgetById = (budgetId: Budget['id']) =>
    budgets.find((budget) => (budget.id = budgetId))

  const addOrEditBudget = ({ id, name, maxAmount }: BudgetDTO) => {
    if (id) {
      setBudgets((currentBudgets) =>
        currentBudgets.map((budget) =>
          budget.id === id ? { id, name, maxAmount } : budget
        )
      )
    } else {
      setBudgets((currentBudgets) => {
        if (
          currentBudgets.some(
            (budget) => budget.name.toLowerCase() === name.toLowerCase()
          )
        ) {
          return currentBudgets
        }
        return [...currentBudgets, { id: createId(), name, maxAmount }]
      })
    }
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

  const getExpensesByBudgetId = (budgetId?: Budget['id']) =>
    expenses.filter((expense) => expense.budgetId === (budgetId || null))

  const [showAddOrEditBudgetForm, setShowAddOrEditBudgetForm] = useState<
    BudgetContextInterface['showAddOrEditBudgetForm']
  >(defaultBudgetContextValue.showAddOrEditBudgetForm)

  const openAddOrEditBudgetForm = (budgetId?: Budget['id']) => {
    selectBudgetId(budgetId)
    setShowAddOrEditBudgetForm(true)
  }
  const closeAddOrEditBudgetForm = () => {
    selectBudgetId(undefined)
    setShowAddOrEditBudgetForm(false)
  }

  const [showConfirmDeleteBudget, setShowConfirmDeleteBudget] = useState<
    BudgetContextInterface['showConfirmDeleteBudget']
  >(defaultBudgetContextValue.showConfirmDeleteBudget)

  const openConfirmDeleteBudget = (budgetId: Budget['id']) => {
    selectBudgetId(budgetId)
    setShowConfirmDeleteBudget(true)
  }
  const closeConfirmDeleteBudget = () => {
    selectBudgetId(undefined)
    setShowConfirmDeleteBudget(false)
  }

  /**
   * Expenses
   */

  const [expenses, setExpenses] = useLocalStorage<
    ExpenseContextInterface['expenses']
  >(Storage.EXPENSES, defaultExpenseContextValue.expenses)

  const [selectedExpenseId, selectExpenseId] = useState<
    ExpenseContextInterface['selectedExpenseId']
  >(defaultExpenseContextValue.selectedExpenseId)

  const getExpenseById = (expenseId: Expense['id']) =>
    expenses.find((expense) => expense.id === expenseId)

  const addOrEditExpense = (
    expense: ExpenseDTO,
    budgetId: Budget['id'] | null
  ) => {
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

  const getBudgetByExpenseId = (expenseId: Expense['id']) => {
    const expense = getExpenseById(expenseId)

    if (expense?.budgetId) {
      return getBudgetById(expense.budgetId)
    }

    return undefined
  }

  const [showViewExpenses, setShowViewExpenses] = useState<
    ExpenseContextInterface['showViewExpenses']
  >(defaultExpenseContextValue.showAddOrEditExpenseForm)

  const openViewExpenses = (budgetId?: Budget['id']) => {
    selectBudgetId(budgetId)
    setShowViewExpenses(true)
  }
  const closeViewExpenses = () => {
    selectBudgetId(undefined)
    setShowViewExpenses(false)
  }

  const [showAddOrEditExpenseForm, setShowAddOrEditExpenseForm] = useState<
    ExpenseContextInterface['showAddOrEditExpenseForm']
  >(defaultExpenseContextValue.showAddOrEditExpenseForm)

  const openAddOrEditExpenseForm = (budgetId?: Budget['id']) => {
    selectBudgetId(budgetId)
    setShowAddOrEditExpenseForm(true)
  }
  const closeAddOrEditExpenseForm = () => {
    selectBudgetId(undefined)
    setShowAddOrEditExpenseForm(false)
  }

  const [showConfirmDeleteExpense, setShowConfirmDeleteExpense] = useState<
    ExpenseContextInterface['showConfirmDeleteExpense']
  >(defaultExpenseContextValue.showConfirmDeleteExpense)

  const openConfirmDeleteExpense = (expenseId: Expense['id']) => {
    console.log({ expenseId })
    selectExpenseId(expenseId)
    setShowConfirmDeleteExpense(true)
  }
  const closeConfirmDeleteExpense = () => {
    selectExpenseId(undefined)
    setShowConfirmDeleteExpense(false)
  }

  return (
    <AppContext.Provider
      value={{
        budget: {
          budgets,
          selectedBudgetId,
          getBudgetById,
          addOrEditBudget,
          deleteBudgetById,
          getExpensesByBudgetId,
          showAddOrEditBudgetForm,
          openAddOrEditBudgetForm,
          closeAddOrEditBudgetForm,
          showConfirmDeleteBudget,
          openConfirmDeleteBudget,
          closeConfirmDeleteBudget,
        },
        expense: {
          expenses,
          selectedExpenseId,
          getExpenseById,
          addOrEditExpense,
          deleteExpenseById,
          getBudgetByExpenseId,
          showViewExpenses,
          openViewExpenses,
          closeViewExpenses,
          showAddOrEditExpenseForm,
          openAddOrEditExpenseForm,
          closeAddOrEditExpenseForm,
          showConfirmDeleteExpense,
          openConfirmDeleteExpense,
          closeConfirmDeleteExpense,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  )
}