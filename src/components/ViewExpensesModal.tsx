import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useEffect, useState } from 'react'
import { Button, Modal, Stack } from 'react-bootstrap'
import { useAppContext } from '../context/AppContext'
import { Budget } from '../types/Budget'
import { Expense } from '../types/Expense'
import CurrencyFormatter from './CurrencyFormatter'

interface ViewExpensesModalProps {}

const ViewExpensesModal: FC<ViewExpensesModalProps> = () => {
  const { budget, expense } = useAppContext()
  const { selectedBudgetId, getBudgetById, getExpensesByBudgetId } = budget
  const {
    expenses,
    showViewExpenses,
    closeViewExpenses,
    openAddOrEditExpenseForm,
    openConfirmDeleteExpense,
  } = expense

  const [currentBudget, setCurrentBudget] = useState<Budget>()
  const [currentExpenses, setCurrentExpenses] = useState<Expense[]>()

  useEffect(() => {
    setCurrentBudget(
      selectedBudgetId ? getBudgetById(selectedBudgetId) : undefined
    )
    setCurrentExpenses(getExpensesByBudgetId(selectedBudgetId))
  }, [selectedBudgetId, expenses])

  return (
    <Modal
      show={showViewExpenses}
      centered
      onHide={() => {
        closeViewExpenses()
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{currentBudget?.name || 'Uncategorized'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentExpenses?.length ? (
          <Stack gap={3}>
            {currentExpenses.map(({ id, description, amount }) => (
              <Stack key={id} direction="horizontal" gap={2}>
                <div className="me-auto fs-4">{description}</div>
                <div className="fs-5">
                  <CurrencyFormatter amount={amount} />
                </div>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => {
                    openAddOrEditExpenseForm(currentBudget?.id, id)
                  }}
                >
                  <FontAwesomeIcon icon="edit" />
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => {
                    openConfirmDeleteExpense(id)
                  }}
                >
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </Stack>
            ))}
          </Stack>
        ) : (
          <div className="fs-4">
            {currentBudget?.name
              ? `No Expenses for ${currentBudget.name}`
              : 'No uncategorized Expenses'}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            openAddOrEditExpenseForm(currentBudget?.id)
          }}
        >
          Add Expense
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewExpensesModal
