import { FC, FormEventHandler, useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useBudgets } from '../context/BudgetContext'
import { Budget } from '../types/Budget'

interface AddOrEditBudgetModalProps {}

const AddOrEditBudgetModal: FC<AddOrEditBudgetModalProps> = () => {
  const {
    selectedBudgetId,
    budgets,
    showAddBudgetForm,
    addOrEditBudget: addBudget,
    closeAddBudgetForm,
  } = useBudgets()

  const [currentBudget, setCurrentBudget] = useState<Budget>()

  const nameRef = useRef<HTMLInputElement | null>(null)
  const maxAmountRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setCurrentBudget(
      selectedBudgetId
        ? budgets.find((budget) => budget.id === selectedBudgetId)
        : undefined
    )

    if (nameRef.current) {
      nameRef.current.value = currentBudget?.name || ''
    }
    if (maxAmountRef.current) {
      maxAmountRef.current.value = currentBudget?.maxAmount.toString() || ''
    }
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (nameRef.current?.value && maxAmountRef.current?.value) {
      addBudget({
        id: selectedBudgetId,
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
          <Modal.Title>{currentBudget ? 'Edit' : 'New'} Budget</Modal.Title>
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
              {currentBudget ? 'Update' : 'Add'}
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}

export default AddOrEditBudgetModal
