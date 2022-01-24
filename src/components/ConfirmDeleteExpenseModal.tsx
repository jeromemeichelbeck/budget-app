import { FC, useEffect, useState } from 'react'
import { Button, Modal, Stack } from 'react-bootstrap'
import { useAppContext } from '../context/AppContext'
import { Expense } from '../types/Expense'

interface ConfirmDeleteExpenseModalProps {}

const ConfirmDeleteExpenseModal: FC<ConfirmDeleteExpenseModalProps> = () => {
  const { expense } = useAppContext()
  const {
    selectedExpenseId,
    getExpenseById,
    deleteExpenseById,
    showConfirmDeleteExpense,
    closeConfirmDeleteExpense,
  } = expense

  const [expenseName, setExpenseName] = useState<Expense['description']>('')

  useEffect(() => {
    console.log({ selectedExpenseId })
    if (selectedExpenseId) {
      const expense = getExpenseById(selectedExpenseId)
      setExpenseName(expense?.description || '')
    } else {
      closeConfirmDeleteExpense()
    }
  }, [selectedExpenseId])

  return (
    <Modal show={showConfirmDeleteExpense} centered>
      <Modal.Header>
        <Modal.Title>Delete Expense {expenseName}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="horizontal" gap={5} className="my-4">
          <Button
            variant="danger"
            className="ms-auto"
            onClick={() => {
              if (selectedExpenseId) {
                deleteExpenseById(selectedExpenseId)
                closeConfirmDeleteExpense()
              }
            }}
          >
            Delete
          </Button>
          <Button
            variant="outline-secondary"
            className="me-auto"
            onClick={() => {
              closeConfirmDeleteExpense()
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmDeleteExpenseModal
