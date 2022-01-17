import { FC } from 'react'
import { ProgressBar } from 'react-bootstrap'

interface BudgetProgressBarProps {
  amount: number
  maxAmount: number
  warningThreshold?: number
  dangerThreshold?: number
}

type BudgetProgressBarVariant = 'success' | 'warning' | 'danger'

const BudgetProgressBar: FC<BudgetProgressBarProps> = ({
  amount,
  maxAmount,
  warningThreshold = 0.5,
  dangerThreshold = 0.75,
}) => {
  const ratio = amount / maxAmount
  let variant: BudgetProgressBarVariant =
    ratio > dangerThreshold
      ? 'danger'
      : ratio > warningThreshold
      ? 'warning'
      : 'success'

  return (
    <ProgressBar
      className="rounded-pill"
      variant={variant}
      min={0}
      max={maxAmount}
      now={amount}
    />
  )
}

export default BudgetProgressBar
