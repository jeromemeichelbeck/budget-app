export type Budget = {
  id: string
  name: string
  maxAmount: number
}

export interface BudgetDTO {
  name: Budget['name']
  maxAmount: Budget['maxAmount']
}
