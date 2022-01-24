import { FC } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useAppContext } from '../context/AppContext'

interface HeaderProps {
  title: string
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { budget, expense } = useAppContext()
  const { openAddOrEditBudgetForm } = budget
  const { openAddOrEditExpenseForm } = expense
  return (
    <header>
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h1 className="me-auto">{title}</h1>
        <Button
          variant="primary"
          onClick={() => {
            openAddOrEditBudgetForm()
          }}
        >
          Add Buget
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => {
            openAddOrEditExpenseForm()
          }}
        >
          Add Expense
        </Button>
      </Stack>
    </header>
  )
}

export default Header
