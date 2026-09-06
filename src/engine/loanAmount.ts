export function calculateLoanAmountFromEMI(
  emi: number,
  annualRate: number,
  tenureMonths: number
): number {
  if (emi <= 0 || annualRate < 0 || tenureMonths <= 0) {
    return 0
  }

  const monthlyRate = annualRate / 12 / 100

  if (monthlyRate === 0) {
    return Math.round(emi * tenureMonths)
  }

  const factor = Math.pow(
    1 + monthlyRate,
    tenureMonths
  )

  const principal =
    (emi * (factor - 1)) /
    (monthlyRate * factor)

  return Math.round(principal)
}