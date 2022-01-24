import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import AddExpenseModal from './components/AddExpenseModal'
import AddOrEditBudgetModal from './components/AddOrEditBudgetModal'
import BudgetList from './components/BudgetList'
import ConfirmDeleteBudgetModal from './components/ConfirmDeleteBudgetModal'
import ConfirmDeleteExpenseModal from './components/ConfirmDeleteExpenseModal'
import Header from './components/Header'
import ViewExpensesModal from './components/ViewExpensesModal'
import { AppProvider } from './context/AppContext'

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <AppProvider>
      <Container className="my-4">
        <Header title="Budgets" />
        <BudgetList />
      </Container>
      <AddOrEditBudgetModal />
      <AddExpenseModal />
      <ViewExpensesModal />
      <ConfirmDeleteBudgetModal />
      <ConfirmDeleteExpenseModal />
    </AppProvider>
  )
}

export default App
