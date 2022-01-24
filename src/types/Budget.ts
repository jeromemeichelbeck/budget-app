export type Budget = {
  id: string
  name: string
  maxAmount: number
}

export interface BudgetDTO {
  id?: Budget['id']
  name: Budget['name']
  maxAmount: Budget['maxAmount']
}
