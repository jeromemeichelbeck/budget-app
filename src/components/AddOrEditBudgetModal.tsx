import { FC, FormEventHandler, useEffect, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useAppContext } from '../context/AppContext'

interface AddOrEditBudgetModalProps {}

const AddOrEditBudgetModal: FC<AddOrEditBudgetModalProps> = () => {
  const { budget } = useAppContext()
  const {
    selectedBudgetId,
    getBudgetById,
    addOrEditBudget,
    showAddOrEditBudgetForm,
    closeAddOrEditBudgetForm,
  } = budget

  const nameRef = useRef<HTMLInputElement | null>(null)
  const maxAmountRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const budget = selectedBudgetId
      ? getBudgetById(selectedBudgetId)
      : undefined

    if (nameRef.current) {
      nameRef.current.value = budget?.name || ''
    }
    if (maxAmountRef.current) {
      maxAmountRef.current.value = budget?.maxAmount.toString() || ''
    }
  }, [selectedBudgetId, nameRef, maxAmountRef])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (nameRef.current?.value && maxAmountRef.current?.value) {
      addOrEditBudget({
        id: selectedBudgetId,
        name: nameRef.current.value,
        maxAmount: parseFloat(maxAmountRef.current.value),
      })
      closeAddOrEditBudgetForm()
    }
  }

  return (
    <Modal
      show={showAddOrEditBudgetForm}
      centered
      onHide={() => {
        closeAddOrEditBudgetForm()
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBudgetId ? 'Edit' : 'New'} Budget</Modal.Title>
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
              {selectedBudgetId ? 'Update' : 'Add'}
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}

export default AddOrEditBudgetModal
