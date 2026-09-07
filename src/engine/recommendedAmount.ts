import type { BorrowerProfile } from '../types/borrower'
import { calculateAffordability } from './affordability'
import { calculateLoanAmountFromEMI } from './loanAmount'
import { estimateLenderAmount } from './lenderEstimate'

export interface RecommendedAmountResult {
  requestedAmount: number
  lenderEstimatedAmount: number
  safeAmount: number
  recommendedAmount: number
  reason: string
}

export function calculateRecommendedAmount(
  borrower: BorrowerProfile,
  annualRate: number,
  tenureMonths: number
): RecommendedAmountResult {
  const affordability =
    calculateAffordability(borrower)

  const safeAmount =
    calculateLoanAmountFromEMI(
      affordability.safeNewEMICeiling,
      annualRate,
      tenureMonths
    )

  const lenderEstimate =
    estimateLenderAmount(borrower)

  const requestedAmount =
    borrower.loanRequest.requestedAmount

  const recommendedAmount =
    Math.min(
      requestedAmount,
      safeAmount
    )

  let reason = ''

  if (safeAmount <= 0) {
    reason =
      'No new borrowing is recommended because there is not enough safe EMI capacity.'
  } else if (requestedAmount <= safeAmount) {
    reason =
      'The requested amount fits within the estimated safe affordability limit.'
  } else {
    reason =
      'The requested amount is higher than the safe affordability limit, so borrowing less is recommended.'
  }

  return {
    requestedAmount,
    lenderEstimatedAmount:
      lenderEstimate.estimatedLoanAmount,
    safeAmount,
    recommendedAmount,
    reason,
  }
}