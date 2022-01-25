import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import { useAppContext } from '../context/AppContext'
import BudgetCard from './BudgetCard'
import Grid from './Grid'

interface BudgetListProps {}

const BudgetList: FC<BudgetListProps> = () => {
  const { budget, expense } = useAppContext()
  const { budgets, getExpensesByBudgetId, openAddOrEditBudgetForm } = budget
  const { expenses, openAddOrEditExpenseForm } = expense

  return (
    <Grid minWidth={300} gap={1} align="start">
      {budgets.length === 0 && (
        <Card>
          <Card.Body>
            <Card.Title>Add a Budget</Card.Title>
            <div className="mb-3">
              Create your first Budget in order to manage your expenses
            </div>
            <Stack direction="horizontal">
              <Button
                variant="primary"
                title="Add a Budget"
                onClick={() => {
                  openAddOrEditBudgetForm()
                }}
              >
                <FontAwesomeIcon icon="plus" />
              </Button>
            </Stack>
          </Card.Body>
        </Card>
      )}
      {expenses.length === 0 && (
        <Card>
          <Card.Body>
            <Card.Title>Add an Expense</Card.Title>
            <div className="mb-3">
              You have no Expenses right now, start by adding one!
            </div>
            <Stack direction="horizontal">
              <Button
                variant="outline-primary"
                title="Add an Expense"
                onClick={() => {
                  openAddOrEditExpenseForm()
                }}
              >
                <FontAwesomeIcon icon="plus" />
              </Button>
            </Stack>
          </Card.Body>
        </Card>
      )}
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
