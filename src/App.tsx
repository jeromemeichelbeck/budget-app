import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import AddBudgetModal from './components/AddBudgetModal'
import AddExpenseModal from './components/AddExpenseModal'
import BudgetList from './components/BudgetList'
import Header from './components/Header'
import ViewExpensesModal from './components/ViewExpensesModal'
import { BudgetProvider, useBudgets } from './context/BudgetContext'

interface AppProps {}

const App: FC<AppProps> = () => {
  const { selectedBudgetId } = useBudgets()

  return (
    <BudgetProvider>
      <Container className="my-4">
        <Header title="Budgets" />
        <BudgetList />
      </Container>
      <AddBudgetModal />
      <AddExpenseModal />
      <ViewExpensesModal />
    </BudgetProvider>
  )
}

export default App
