import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import AddExpenseModal from './components/AddExpenseModal'
import AddOrEditBudgetModal from './components/AddOrEditBudgetModal'
import BudgetList from './components/BudgetList'
import Header from './components/Header'
import ViewExpensesModal from './components/ViewExpensesModal'
import { BudgetProvider } from './context/BudgetContext'

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <BudgetProvider>
      <Container className="my-4">
        <Header title="Budgets" />
        <BudgetList />
      </Container>
      <AddOrEditBudgetModal />
      <AddExpenseModal />
      <ViewExpensesModal />
    </BudgetProvider>
  )
}

export default App
