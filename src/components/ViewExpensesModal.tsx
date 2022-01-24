import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useState } from 'react'
import { Button, Modal, Stack } from 'react-bootstrap'
import { useBudgets } from '../context/BudgetContext'
import CurrencyFormatter from './CurrencyFormatter'

interface ViewExpensesModalProps {}

const ViewExpensesModal: FC<ViewExpensesModalProps> = () => {
  const [readyToDelete, setReadyToDelete] = useState<boolean>(false)

  const {
    showViewExpenses,
    selectedBudgetId,
    budgets,
    closeViewExpenses,
    openAddExpenseForm,
    getBudgetExpenses,
    deleteBudgetById,
    deleteExpenseById,
  } = useBudgets()

  const currentBudget = budgets.find((budget) => budget.id === selectedBudgetId)
  const currentExpenses = getBudgetExpenses(selectedBudgetId)

  const countExpenses = currentExpenses.length
  const totalAmountExpenses = currentExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  )

  return (
    <Modal
      show={showViewExpenses}
      onHide={() => {
        setReadyToDelete(false)
        closeViewExpenses()
      }}
    >
      <Modal.Header closeButton>
        <Stack direction="horizontal" gap={2}>
          <Modal.Title>{currentBudget?.name || 'Uncategorized'}</Modal.Title>
          {selectedBudgetId && !readyToDelete && (
            <Button
              variant="outline-danger"
              disabled={readyToDelete}
              onClick={() => {
                if (selectedBudgetId) {
                  setReadyToDelete(true)
                }
              }}
            >
              <FontAwesomeIcon icon="trash" />
            </Button>
          )}
        </Stack>
      </Modal.Header>
      <Modal.Body>
        {readyToDelete && currentBudget ? (
          <Stack gap={3}>
            <div>Delete {currentBudget.name}?</div>
            {countExpenses > 0 ? (
              <div>
                {countExpenses} expense{countExpenses !== 1 && 's'} will be
                uncategorized, for a total amount of{' '}
                <strong>
                  <CurrencyFormatter amount={totalAmountExpenses} />
                </strong>{' '}
              </div>
            ) : (
              <div>This budget contains no expenses</div>
            )}
            <Stack direction="horizontal" gap={2}>
              <Button
                variant="danger"
                onClick={() => {
                  if (selectedBudgetId) {
                    deleteBudgetById(selectedBudgetId)
                  }
                  setReadyToDelete(false)
                  closeViewExpenses()
                }}
              >
                Delete
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setReadyToDelete(false)
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        ) : countExpenses ? (
          <Stack gap={3}>
            {currentExpenses.map(({ id, description, amount }) => (
              <Stack key={id} direction="horizontal" gap={2}>
                <div className="me-auto fs-4">{description}</div>
                <div className="fs-5">
                  <CurrencyFormatter amount={amount} />
                </div>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => {
                    deleteExpenseById(id)
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
            openAddExpenseForm(currentBudget?.id)
          }}
        >
          Add Expense
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewExpensesModal
