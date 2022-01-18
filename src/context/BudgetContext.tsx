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
  openAddBudgetForm: () => void
  closeAddBudgetForm: () => void
  showAddExpenseForm: boolean
  openAddExpenseForm: (budgetId?: Budget['id']) => void
  closeAddExpenseForm: () => void
  selectedBudgetId?: Budget['id']
  getBudgetExpenses: (budgetId: Budget['id']) => Expense[]
  addBudget: (newBudget: BudgetDTO) => void
  deleteBudgetById: (budgetId: Budget['id']) => void
  addExpense: (newExpense: ExpenseDTO, budgetId: Budget['id'] | null) => void
  deleteExpenseById: (expenseId: Expense['id']) => void
}

const defaultBudgetContectValue: BudgetContextInterface = {
  budgets: [],
  expenses: [],
  showAddBudgetForm: false,
  openAddBudgetForm: () => {},
  closeAddBudgetForm: () => {},
  showAddExpenseForm: false,
  openAddExpenseForm: () => {},
  closeAddExpenseForm: () => {},
  selectedBudgetId: undefined,
  getBudgetExpenses: (budgetId: Budget['id']) => [],
  addBudget: (newBudget: BudgetDTO) => {},
  deleteBudgetById: (budgetId: Budget['id']) => {},
  addExpense: (newExpense: ExpenseDTO, budgetId: Budget['id'] | null) => {},
  deleteExpenseById: (expenseId: Expense['id']) => {},
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
  const [selectedBudgetId, selectBudgetId] = useState<
    BudgetContextInterface['selectedBudgetId']
  >(defaultBudgetContectValue.selectedBudgetId)

  const openAddBudgetForm = () => {
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
        openAddBudgetForm,
        closeAddBudgetForm,
        showAddExpenseForm,
        openAddExpenseForm,
        closeAddExpenseForm,
        selectedBudgetId,
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
