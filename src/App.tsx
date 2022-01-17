import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Main from './components/Main'
import { BudgetProvider } from './context/BudgetContext'

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <BudgetProvider>
      <Container className="my-4">
        <Header title="Budgets" />
        <Main />
      </Container>
    </BudgetProvider>
  )
}

export default App
