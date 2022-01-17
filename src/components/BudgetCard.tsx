import { FC } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import BudgetProgressBar from './BudgetProgressBar'
import CurrencyFormatter from './CurrencyFormatter'

interface BudgetCardProps {
  name: string
  amount: number
  maxAmount: number
  gray?: boolean
}

const BudgetCard: FC<BudgetCardProps> = ({
  name,
  amount,
  maxAmount,
  gray = false,
}) => {
  const classNames: string[] = []
  if (amount > maxAmount) {
    classNames.push('bg-danger', 'bg-opacity-10')
  } else if (gray) {
    classNames.push('bg-light')
  }

  return (
    <Card className={classNames.join(' ')}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            <CurrencyFormatter amount={amount} />
            <span className="text-muted fs-6 ms-2">
              {'/ '}
              <CurrencyFormatter amount={maxAmount} />
            </span>
          </div>
        </Card.Title>
        <BudgetProgressBar amount={amount} maxAmount={maxAmount} />
        <Stack direction="horizontal" gap={2} className="mt-4">
          <Button variant="outline-primary" className="ms-auto">
            Add Expense
          </Button>
          <Button variant="outline-secondary">View Expenses</Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}

export default BudgetCard
