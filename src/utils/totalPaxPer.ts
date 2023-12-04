import { type Tax } from '@/interface/products'

export const totalTaxPer = (taxes: Tax[]) => {
  return taxes.reduce(
    (accumulator: number, currentValue: Tax) =>
      accumulator + currentValue.percentage,
    0
  )
}
