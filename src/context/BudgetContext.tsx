import { createContext, FC, useContext, useState } from 'react'
import { v4 as createId } from 'uuid'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Budget, BudgetDTO } from '../types/Budget'
import { Expense, ExpenseDTO } from '../types/Expense'
import { Storage } from '../types/Storage'

interface BudgetContextInterface {
  budgets: Budget[]
  expenses: Expense[]
  showAddBudgetForm: boolean
  openAddOrEditBudgetForm: (budgetId?: Budget['id']) => void
  closeAddBudgetForm: () => void
  showAddExpenseForm: boolean
  openAddExpenseForm: (budgetId?: Budget['id']) => void
  closeAddExpenseForm: () => void
  showViewExpenses: boolean
  openViewExpenses: (budgetId?: Budget['id']) => void
  closeViewExpenses: () => void
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
  showAddBudgetForm: false,
  openAddOrEditBudgetForm: () => {},
  closeAddBudgetForm: () => {},
  showAddExpenseForm: false,
  openAddExpenseForm: () => {},
  closeAddExpenseForm: () => {},
  showViewExpenses: false,
  openViewExpenses: () => {},
  closeViewExpenses: () => {},
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
  const [showAddBudgetForm, setShowAddBudgetForm] = useState<
    BudgetContextInterface['showAddBudgetForm']
  >(defaultBudgetContectValue.showAddBudgetForm)
  const [showAddExpenseForm, setShowAddExpenseForm] = useState<
    BudgetContextInterface['showAddExpenseForm']
  >(defaultBudgetContectValue.showAddExpenseForm)
  const [showViewExpenses, setShowViewExpenses] = useState<
    BudgetContextInterface['showViewExpenses']
  >(defaultBudgetContectValue.showAddExpenseForm)
  const [selectedBudgetId, selectBudgetId] = useState<
    BudgetContextInterface['selectedBudgetId']
  >(defaultBudgetContectValue.selectedBudgetId)

  const openAddOrEditBudgetForm = (budgetId?: Budget['id']) => {
    selectBudgetId(budgetId)
    setShowAddBudgetForm(true)
  }

  const closeAddBudgetForm = () => {
    setShowAddBudgetForm(false)
  }

  const openAddExpenseForm = (budgetId?: Budget['id']) => {
    selectBudgetId(budgetId)
    setShowAddExpenseForm(true)
  }

  const closeAddExpenseForm = () => {
    setShowAddExpenseForm(false)
  }

  const openViewExpenses = (budgetId?: Budget['id']) => {
    selectBudgetId(budgetId)
    setShowViewExpenses(true)
  }

  const closeViewExpenses = () => {
    setShowViewExpenses(false)
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
        showAddBudgetForm,
        openAddOrEditBudgetForm,
        closeAddBudgetForm,
        showAddExpenseForm,
        openAddExpenseForm,
        closeAddExpenseForm,
        showViewExpenses,
        openViewExpenses,
        closeViewExpenses,
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
