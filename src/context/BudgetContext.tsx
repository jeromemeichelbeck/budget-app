import { createContext, FC, useContext, useState } from 'react'
import { v4 as createId } from 'uuid'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Budget, BudgetDTO } from '../types/Budget'
import { Expense, ExpenseDTO } from '../types/Expense'
import { Storage } from '../types/Storage'

interface BudgetContextInterface {
  budgets: Budget[]
  expenses: Expense[]
  showAddOrEditBudgetForm: boolean
  openAddOrEditBudgetForm: (budgetId?: Budget['id']) => void
  closeAddOrEditBudgetForm: () => void
  showAddExpenseForm: boolean
  openAddExpenseForm: (budgetId?: Budget['id']) => void
  closeAddExpenseForm: () => void
  showViewExpenses: boolean
  openViewExpenses: (budgetId?: Budget['id']) => void
  closeViewExpenses: () => void
  showConfirmDeleteBudget: boolean
  openConfirmDeleteBudget: (budgetId: Budget['id']) => void
  closeConfirmDeleteBudget: () => void
  showConfirmDeleteExpense: boolean
  openConfirmDeleteExpense: (expenseId: Expense['id']) => void
  closeConfirmDeleteExpense: () => void
  selectedBudgetId?: Budget['id']
  getBudgetExpenses: (budgetId?: Budget['id']) => Expense[]
  addOrEditBudget: (newBudget: BudgetDTO) => void
  deleteBudgetById: (budgetId: Budget['id']) => void
  addExpense: (newExpense: ExpenseDTO, budgetId: Budget['id'] | null) => void
  deleteExpenseById: (expenseId: Expense['id']) => void
}

const defaultBudgetContectValue: BudgetContextInterface = {
  budgets: [],
  expenses: [],
  showAddOrEditBudgetForm: false,
  openAddOrEditBudgetForm: () => {},
  closeAddOrEditBudgetForm: () => {},
  showAddExpenseForm: false,
  openAddExpenseForm: () => {},
  closeAddExpenseForm: () => {},
  showViewExpenses: false,
  openViewExpenses: () => {},
  closeViewExpenses: () => {},
  showConfirmDeleteBudget: false,
  openConfirmDeleteBudget: () => {},
  closeConfirmDeleteBudget: () => {},
  showConfirmDeleteExpense: false,
  openConfirmDeleteExpense: () => {},
  closeConfirmDeleteExpense: () => {},
  selectedBudgetId: undefined,
  getBudgetExpenses: () => [],
  addOrEditBudget: () => {},
  deleteBudgetById: () => {},
  addExpense: () => {},
  deleteExpenseById: () => {},
}

const BudgetContext = createContext(defaultBudgetContectValue)

export const useBudgets = () => {
  return useContext<BudgetContextInterface>(BudgetContext)
}

export const BudgetProvider: FC = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage<
    BudgetContextInterface['budgets']
  >(Storage.BUDGETS, defaultBudgetContectValue.budgets)
  const [expenses, setExpenses] = useLocalStorage<
    BudgetContextInterface['expenses']
  >(Storage.EXPENSES, defaultBudgetContectValue.expenses)
  const [showAddOrEditBudgetForm, setShowAddOrEditBudgetForm] = useState<
    BudgetContextInterface['showAddOrEditBudgetForm']
  >(defaultBudgetContectValue.showAddOrEditBudgetForm)
  const [showAddExpenseForm, setShowAddExpenseForm] = useState<
    BudgetContextInterface['showAddExpenseForm']
  >(defaultBudgetContectValue.showAddExpenseForm)
  const [showViewExpenses, setShowViewExpenses] = useState<
    BudgetContextInterface['showViewExpenses']
  >(defaultBudgetContectValue.showAddExpenseForm)
  const [showConfirmDeleteBudget, setShowConfirmDeleteBudget] = useState<
    BudgetContextInterface['showConfirmDeleteBudget']
  >(defaultBudgetContectValue.showAddExpenseForm)
  const [showConfirmDeleteExpense, setShowConfirmDeleteExpense] = useState<
    BudgetContextInterface['showConfirmDeleteExpense']
  >(defaultBudgetContectValue.showAddExpenseForm)
  const [selectedBudgetId, selectBudgetId] = useState<
    BudgetContextInterface['selectedBudgetId']
  >(defaultBudgetContectValue.selectedBudgetId)

  const openAddOrEditBudgetForm = (budgetId?: Budget['id']) => {
    selectBudgetId(budgetId)
    setShowAddOrEditBudgetForm(true)
  }

  const closeAddOrEditBudgetForm = () => {
    selectBudgetId(undefined)
    setShowAddOrEditBudgetForm(false)
  }

  const openAddExpenseForm = (budgetId?: Budget['id']) => {
    selectBudgetId(budgetId)
    setShowAddExpenseForm(true)
  }

  const closeAddExpenseForm = () => {
    selectBudgetId(undefined)
    setShowAddExpenseForm(false)
  }

  const openViewExpenses = (budgetId?: Budget['id']) => {
    selectBudgetId(budgetId)
    setShowViewExpenses(true)
  }

  const closeViewExpenses = () => {
    selectBudgetId(undefined)
    setShowViewExpenses(false)
  }

  const openConfirmDeleteBudget = (budgetId: Budget['id']) => {
    selectBudgetId(budgetId)
    setShowConfirmDeleteBudget(true)
  }

  const closeConfirmDeleteBudget = () => {
    selectBudgetId(undefined)
    setShowConfirmDeleteBudget(false)
  }

  const openConfirmDeleteExpense = (expenseId: Expense['id']) => {
    selectBudgetId(expenseId)
    setShowConfirmDeleteExpense(true)
  }

  const closeConfirmDeleteExpense = () => {
    selectBudgetId(undefined)
    setShowConfirmDeleteExpense(false)
  }

  const getBudgetExpenses = (budgetId?: Budget['id']) =>
    expenses.filter((expense) => expense.budgetId === (budgetId || null))

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

  const addExpense = (expense: ExpenseDTO, budgetId: Budget['id'] | null) => {
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
        showAddOrEditBudgetForm,
        openAddOrEditBudgetForm,
        closeAddOrEditBudgetForm,
        showAddExpenseForm,
        openAddExpenseForm,
        closeAddExpenseForm,
        showViewExpenses,
        openViewExpenses,
        closeViewExpenses,
        showConfirmDeleteBudget,
        openConfirmDeleteBudget,
        closeConfirmDeleteBudget,
        showConfirmDeleteExpense,
        openConfirmDeleteExpense,
        closeConfirmDeleteExpense,
        selectedBudgetId,
        getBudgetExpenses,
        addExpense,
        addOrEditBudget: addOrEditBudget,
        deleteExpenseById,
        deleteBudgetById,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
