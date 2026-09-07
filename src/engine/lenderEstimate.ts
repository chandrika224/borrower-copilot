import type { BorrowerProfile } from '../types/borrower'

import { calculateLoanAmountFromEMI } from './loanAmount'

const LENDER_FOIR = 0.5

const DEFAULT_RATE = 15

const DEFAULT_TENURE_MONTHS = 60

export interface LenderEstimateResult {
  maximumNewEMI?: number
  estimatedLoanAmount?: number
  confidence: 'HIGH' | 'LOW'
  warning?: string
}

export function estimateLenderAmount(
  borrower: BorrowerProfile
): LenderEstimateResult {
  const monthlyIncome =
    borrower.income.monthlyNetIncome

  const existingEMIs =
    borrower.expenses.existingEMIs

  // Existing EMI is required for a meaningful
  // FOIR-based lender estimate.
  if (existingEMIs === undefined) {
    return {
      maximumNewEMI: undefined,
      estimatedLoanAmount: undefined,
      confidence: 'LOW',
      warning:
        'A lender-style FOIR estimate cannot be calculated because the existing EMI amount is unknown.',
    }
  }

  const maximumTotalEMI =
    monthlyIncome * LENDER_FOIR

  const maximumNewEMI =
    Math.max(
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
    maximumNewEMI: Math.round(
      maximumNewEMI
    ),
    estimatedLoanAmount,
    confidence: 'HIGH',
  }
}