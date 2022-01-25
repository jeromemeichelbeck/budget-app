import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import { useAppContext } from '../context/AppContext'

interface AddExpenseCardProps {}

const AddExpenseCard: FC<AddExpenseCardProps> = () => {
  const { expense } = useAppContext()
  const { openAddOrEditExpenseForm } = expense

  return (
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
  )
}

export default AddExpenseCard
