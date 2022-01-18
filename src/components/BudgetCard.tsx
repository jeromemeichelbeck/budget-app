import { FC } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import { useBudgets } from '../context/BudgetContext'
import { Budget } from '../types/Budget'
import { Expense } from '../types/Expense'
import BudgetProgressBar from './BudgetProgressBar'
import CurrencyFormatter from './CurrencyFormatter'

interface BudgetCardProps {
  id?: Budget['id']
  name: Budget['name']
  amount: Expense['amount']
  maxAmount?: number
  gray?: boolean
  hideButtons?: boolean
}

const BudgetCard: FC<BudgetCardProps> = ({
  id,
  name,
  amount,
  maxAmount,
  gray,
  hideButtons,
}) => {
  const { openAddExpenseForm, openViewExpenses } = useBudgets()

  const classNames: string[] = []
  if (maxAmount && amount > maxAmount) {
    classNames.push('bg-danger', 'bg-opacity-10')
  } else if (gray) {
    classNames.push('bg-light')
  }

  if (!maxAmount && !amount) {
    return null
  }

  return (
    <Card className={classNames.join(' ')}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            <CurrencyFormatter amount={amount} />
            {maxAmount && (
              <span className="text-muted fs-6 ms-2">
                {'/ '}
                <CurrencyFormatter amount={maxAmount} />
              </span>
            )}
          </div>
        </Card.Title>
        {maxAmount && (
          <BudgetProgressBar amount={amount} maxAmount={maxAmount} />
        )}

        {!hideButtons && (
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={() => {
                openAddExpenseForm(id)
              }}
            >
              Add Expense
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                openViewExpenses(id)
              }}
            >
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}

export default BudgetCard
