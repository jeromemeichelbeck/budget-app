import { FC } from 'react'
import { Button, Stack } from 'react-bootstrap'

interface HeaderProps {
  title: string
  handleOpenAddBudgetForm: () => void
}

const Header: FC<HeaderProps> = ({ title, handleOpenAddBudgetForm }) => {
  return (
    <header>
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h1 className="me-auto">{title}</h1>
        <Button variant="primary" onClick={handleOpenAddBudgetForm}>
          Add Buget
        </Button>
        <Button variant="outline-primary">Add Expense</Button>
      </Stack>
    </header>
  )
}

export default Header
