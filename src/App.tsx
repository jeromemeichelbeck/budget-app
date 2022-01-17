import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Main from './components/Main'

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <Container className="my-4">
      <Header title="Budgets" />
      <Main />
    </Container>
  )
}

export default App
