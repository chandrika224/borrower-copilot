export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): number {
  if (principal <= 0 || annualRate < 0 || tenureMonths <= 0) {
    return 0
  }

  const monthlyRate = annualRate / 12 / 100

  if (monthlyRate === 0) {
    return principal / tenureMonths
  }

  const factor = Math.pow(
    1 + monthlyRate,
    tenureMonths
  )

  const emi =
    (principal * monthlyRate * factor) /
    (factor - 1)

  return Math.round(emi)
}

