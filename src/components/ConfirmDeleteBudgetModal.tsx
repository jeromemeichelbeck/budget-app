import { FC, useEffect, useState } from 'react'
import { Button, Modal, Stack } from 'react-bootstrap'
import { useBudgets } from '../context/BudgetContext'
import { Budget } from '../types/Budget'
import CurrencyFormatter from './CurrencyFormatter'

interface ConfirmDeleteBudgetModalProps {}

const ConfirmDeleteBudgetModal: FC<ConfirmDeleteBudgetModalProps> = () => {
  const {
    selectedBudgetId,
    budgets,
    getBudgetExpenses,
    deleteBudgetById,
    showConfirmDeleteBudget,
    closeConfirmDeleteBudget,
  } = useBudgets()

  const [budgetName, setBudgetName] = useState<Budget['name']>('')
  const [countExpenses, setCountExpenses] = useState<number>(0)
  const [totalAmountExpenses, setTotalAmountExpenses] = useState<number>(0)

  useEffect(() => {
    if (selectedBudgetId) {
      setBudgetName(
        budgets.find((budget) => budget.id === selectedBudgetId)?.name || ''
      )
      const expenses = getBudgetExpenses(selectedBudgetId)
      setCountExpenses(expenses.length)
      setTotalAmountExpenses(
        expenses.reduce((total, expense) => total + expense.amount, 0)
      )
    } else {
      closeConfirmDeleteBudget()
    }
  })

  return (
    <Modal show={showConfirmDeleteBudget} centered>
      <Modal.Header>
        <Modal.Title>Delete Budget {budgetName}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <Stack direction="horizontal" gap={5} className="my-4">
          <Button
            variant="danger"
            className="ms-auto"
            onClick={() => {
              if (selectedBudgetId) {
                deleteBudgetById(selectedBudgetId)
                closeConfirmDeleteBudget()
              }
            }}
          >
            Delete
          </Button>
          <Button
            variant="outline-secondary"
            className="me-auto"
            onClick={() => {
              closeConfirmDeleteBudget()
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmDeleteBudgetModal
