import { FC, FormEventHandler, useEffect, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useAppContext } from '../context/AppContext'

interface AddOrEditExpenseModalProps {}

const AddOrEditExpenseModal: FC<AddOrEditExpenseModalProps> = () => {
  const { budget, expense } = useAppContext()
  const { budgets, selectedBudgetId } = budget
  const {
    selectedExpenseId,
    getExpenseById,
    addOrEditExpense,
    showAddOrEditExpenseForm,
    closeAddOrEditExpenseForm,
  } = expense

  const budgetIdRef = useRef<HTMLSelectElement>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const amountRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const expense = selectedExpenseId
      ? getExpenseById(selectedExpenseId)
      : undefined
    if (descriptionRef.current) {
      descriptionRef.current.value = expense?.description || ''
    }
    if (amountRef.current) {
      amountRef.current.value = expense?.amount.toString() || ''
    }
  }, [selectedExpenseId, descriptionRef, amountRef])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (descriptionRef.current?.value && amountRef.current?.value) {
      addOrEditExpense(
        {
          id: selectedExpenseId,
          description: descriptionRef.current.value,
          amount: parseFloat(amountRef.current.value),
        },
        budgetIdRef.current?.value || null
      )
      closeAddOrEditExpenseForm()
    }
  }

  return (
    <Modal
      show={showAddOrEditExpenseForm}
      centered
      onHide={() => {
        closeAddOrEditExpenseForm()
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedExpenseId ? 'Edit' : 'New'} Expense
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={selectedBudgetId} ref={budgetIdRef}>
              <option value="">Uncategorized</option>
              {budgets.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" required ref={descriptionRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={0.01}
              required
              ref={amountRef}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              {selectedExpenseId ? 'Update' : 'Add'}
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}

export default AddOrEditExpenseModal
