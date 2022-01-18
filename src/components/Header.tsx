import { FC } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useBudgets } from '../context/BudgetContext'

interface HeaderProps {
  title: string
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { openAddBudgetForm, openAddExpenseForm } = useBudgets()
  return (
    <header>
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h1 className="me-auto">{title}</h1>
        <Button
          variant="primary"
          onClick={() => {
            openAddBudgetForm()
          }}
        >
          Add Buget
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => {
            openAddExpenseForm()
          }}
        >
          Add Expense
        </Button>
      </Stack>
    </header>
  )
}

export default Header
