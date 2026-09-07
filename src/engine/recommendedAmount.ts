import type { BorrowerProfile } from '../types/borrower'

import { calculateAffordability } from './affordability'

import { calculateLoanAmountFromEMI } from './loanAmount'

import { estimateLenderAmount } from './lenderEstimate'

export interface RecommendedAmountResult {
  requestedAmount: number

  lenderEstimatedAmount?: number

  safeAmount?: number

  recommendedAmount?: number

  reason: string

  confidence: 'HIGH' | 'LOW'
}

export function calculateRecommendedAmount(
  borrower: BorrowerProfile,
  annualRate: number,
  tenureMonths: number
): RecommendedAmountResult {
  const affordability =
    calculateAffordability(borrower)

  const lenderEstimate =
    estimateLenderAmount(borrower)

  const requestedAmount =
    borrower.loanRequest.requestedAmount

  const safeEMI =
    affordability.safeNewEMICeiling

  // We cannot calculate a safe borrowing amount
  // when the borrower's existing EMI is unknown.
  if (safeEMI === undefined) {
    return {
      requestedAmount,
      lenderEstimatedAmount:
        lenderEstimate.estimatedLoanAmount,
      safeAmount: undefined,
      recommendedAmount: undefined,
      confidence: 'LOW',
      reason:
        'A safe borrowing amount cannot be recommended because your existing EMI amount is unknown. We should not assume that your current loan payments are zero.',
    }
  }

  const safeAmount =
    calculateLoanAmountFromEMI(
      safeEMI,
      annualRate,
      tenureMonths
    )

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
    confidence: 'HIGH',
  }
}