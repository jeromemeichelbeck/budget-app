import { FC } from 'react'
import { Card } from 'react-bootstrap'
import BudgetProgressBar from './BudgetProgressBar'
import CurrencyFormatter from './CurrencyFormatter'

interface BudgetCardProps {
  name: string
  amount: number
  maxAmount: number
}

const BudgetCard: FC<BudgetCardProps> = ({ name, amount, maxAmount }) => {
  return (
    <Card>
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
      </Card.Body>
    </Card>
  )
}

export default BudgetCard
