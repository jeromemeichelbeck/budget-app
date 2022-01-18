import { FC, FormEventHandler, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useBudgets } from '../context/BudgetContext'

interface AddBudgetModalProps {}

const AddBudgetModal: FC<AddBudgetModalProps> = () => {
  const { showAddBudgetForm, closeAddBudgetForm } = useBudgets()

  const nameRef = useRef<HTMLInputElement>(null)
  const maxAmountRef = useRef<HTMLInputElement>(null)
  const { addBudget } = useBudgets()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (nameRef.current?.value && maxAmountRef.current?.value) {
      addBudget({
        name: nameRef.current.value,
        maxAmount: parseFloat(maxAmountRef.current.value),
      })
      closeAddBudgetForm()
    }
  }

  return (
    <Modal
      show={showAddBudgetForm}
      onHide={() => {
        closeAddBudgetForm()
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required ref={nameRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="maxAmount">
            <Form.Label>Max Spending</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={0.01}
              required
              ref={maxAmountRef}
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

export default AddBudgetModal
