import { FC } from 'react'
import { useBudgets } from '../context/BudgetContext'
import BudgetCard from './BudgetCard'
import Grid from './Grid'

interface BudgetListProps {}

const BudgetList: FC<BudgetListProps> = () => {
  const { budgets, expenses, getBudgetExpenses } = useBudgets()

  return (
    <Grid minWidth={300} gap={1} align="start">
      {budgets.map(({ id, name, maxAmount }) => (
        <BudgetCard
          key={id}
          id={id}
          name={name}
          amount={getBudgetExpenses(id).reduce(
            (total, expense) => total + expense.amount,
            0
          )}
          maxAmount={maxAmount}
        />
      ))}
      <BudgetCard
        name="Uncategorized"
        amount={getBudgetExpenses().reduce(
          (total, expense) => total + expense.amount,
          0
        )}
        gray
      />
      <BudgetCard
        name="Total"
        amount={expenses.reduce((total, expense) => total + expense.amount, 0)}
        maxAmount={budgets.reduce(
          (total, budget) => total + budget.maxAmount,
          0
        )}
        gray
        hideButtons
      />
    </Grid>
  )
}

export default BudgetList
