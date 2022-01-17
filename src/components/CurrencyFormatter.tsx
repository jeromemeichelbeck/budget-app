import { FC } from 'react'

interface CurrencyFormatterOptions {
  currency?: 'usd' | 'eur'
  numberOfDigits?: number
}

interface CurrencyFormatterProps {
  amount: number
  currency?: 'usd' | 'eur'
  numberOfDigits?: number
}

const CurrencyFormatter: FC<CurrencyFormatterProps> = ({
  amount,
  currency = 'eur',
  numberOfDigits = 0,
}) => {
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency,
    style: 'currency',
    minimumFractionDigits: numberOfDigits,
  })
  return <span>{currencyFormatter.format(amount)}</span>
}

export default CurrencyFormatter
