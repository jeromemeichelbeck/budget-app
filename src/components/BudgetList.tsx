import { FC } from 'react'
import { useAppContext } from '../context/AppContext'
import BudgetCard from './BudgetCard'
import Grid from './Grid'

interface BudgetListProps {}

const BudgetList: FC<BudgetListProps> = () => {
  const { budget, expense } = useAppContext()
  const { budgets, getExpensesByBudgetId } = budget
  const { expenses } = expense

  return (
    <Grid minWidth={300} gap={1} align="start">
      {budgets.map(({ id, name, maxAmount }) => (
        <BudgetCard
          key={id}
          id={id}
          name={name}
          amount={getExpensesByBudgetId(id).reduce(
            (total, expense) => total + expense.amount,
            0
          )}
          maxAmount={maxAmount}
        />
      ))}
      <BudgetCard
        name="Uncategorized"
        amount={getExpensesByBudgetId().reduce(
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
