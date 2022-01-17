import { FC } from 'react'
import BudgetCard from './BudgetCard'
import Grid from './Grid'

interface Mainprops {}

const Main: FC<Mainprops> = () => {
  return (
    <main>
      <Grid minWidth={300} gap={1} align="start">
        <BudgetCard name="Entertainment" amount={200} maxAmount={1000} />
        <BudgetCard name="Food" amount={50} maxAmount={200} />
        <BudgetCard name="Uncategorized" amount={1550} maxAmount={1500} />
        <BudgetCard name="Card 4" amount={159} maxAmount={300} gray />
      </Grid>
    </main>
  )
}

export default Main
