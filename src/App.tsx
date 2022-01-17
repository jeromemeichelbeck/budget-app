import React, { FC, useState } from 'react'
import { Container } from 'react-bootstrap'
import AddBudgetModal from './components/AddBudgetModal'
import BudgetList from './components/BudgetList'
import Header from './components/Header'
import { BudgetProvider } from './context/BudgetContext'

interface AppProps {}

const App: FC<AppProps> = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState<boolean>(false)

  return (
    <BudgetProvider>
      <Container className="my-4">
        <Header
          title="Budgets"
          handleOpenAddBudgetForm={() => {
            setShowAddBudgetModal(true)
          }}
        />
        <BudgetList />
      </Container>
      <AddBudgetModal
        handleCloseAddBudgetForm={() => {
          setShowAddBudgetModal(false)
        }}
        show={showAddBudgetModal}
      />
    </BudgetProvider>
  )
}

export default App
