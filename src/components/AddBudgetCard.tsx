import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import { useAppContext } from '../context/AppContext'

interface AddBudgetCardProps {}

const AddBudgetCard: FC<AddBudgetCardProps> = () => {
  const { budget } = useAppContext()
  const { openAddOrEditBudgetForm } = budget

  return (
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
  )
}

export default AddBudgetCard
