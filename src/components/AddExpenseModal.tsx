import { FC, FormEventHandler, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useBudgets } from '../context/BudgetContext'

interface AddExpenseModalProps {}

const AddExpenseModal: FC<AddExpenseModalProps> = () => {
  const { showAddExpenseForm, closeAddExpenseForm, selectedBudgetId } =
    useBudgets()

  const budgetIdRef = useRef<HTMLSelectElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)
  const { addExpense, budgets } = useBudgets()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (descriptionRef.current?.value && amountRef.current?.value) {
      addExpense(
        {
          description: descriptionRef.current.value,
          amount: parseFloat(amountRef.current.value),
        },
        budgetIdRef.current?.value || null
      )
      closeAddExpenseForm()
    }
  }

  return (
    <Modal
      show={showAddExpenseForm}
      onHide={() => {
        closeAddExpenseForm()
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
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
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}

export default AddExpenseModal