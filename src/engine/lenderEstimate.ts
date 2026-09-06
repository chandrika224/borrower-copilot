import type { BorrowerProfile } from '../types/borrower'
import { calculateLoanAmountFromEMI } from './loanAmount'

const LENDER_FOIR = 0.5
const DEFAULT_RATE = 15
const DEFAULT_TENURE_MONTHS = 60

export interface LenderEstimateResult {
  maximumNewEMI: number
  estimatedLoanAmount: number
}

export function estimateLenderAmount(
  borrower: BorrowerProfile
): LenderEstimateResult {
  const monthlyIncome =
    borrower.income.monthlyNetIncome

  const existingEMIs =
    borrower.expenses.existingEMIs

  const maximumTotalEMI =
    monthlyIncome * LENDER_FOIR

  const maximumNewEMI = Math.max(
    0,
    maximumTotalEMI - existingEMIs
  )

  const estimatedLoanAmount =
    calculateLoanAmountFromEMI(
      maximumNewEMI,
      DEFAULT_RATE,
      DEFAULT_TENURE_MONTHS
    )

  return {
    maximumNewEMI: Math.round(maximumNewEMI),
    estimatedLoanAmount,
  }
}