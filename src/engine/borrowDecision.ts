import type { BorrowerProfile } from '../types/borrower'
import { calculateAffordability } from './affordability'
import { calculateLoanAmountFromEMI } from './loanAmount'

export type BorrowDecision =
  | 'BORROW'
  | 'BORROW_LESS'
  | 'DONT_BORROW'

export interface BorrowDecisionResult {
  decision: BorrowDecision
  requestedAmount: number
  safeAmount: number
  safeEMI: number
  reason: string
}

export function decideBorrowing(
  borrower: BorrowerProfile,
  annualRate: number,
  tenureMonths: number
): BorrowDecisionResult {
  const affordability =
    calculateAffordability(borrower)

  const safeEMI =
    affordability.safeNewEMICeiling

  const safeAmount =
    calculateLoanAmountFromEMI(
      safeEMI,
      annualRate,
      tenureMonths
    )

  const requestedAmount =
    borrower.loanRequest.requestedAmount

  if (safeEMI <= 0) {
    return {
      decision: 'DONT_BORROW',
      requestedAmount,
      safeAmount: 0,
      safeEMI,
      reason:
        'Your current income and existing commitments do not leave enough room for a new EMI without putting your monthly budget under strain.',
    }
  }

  if (requestedAmount > safeAmount) {
    return {
      decision: 'BORROW_LESS',
      requestedAmount,
      safeAmount,
      safeEMI,
      reason:
        'The requested amount would require a higher EMI than your current safe affordability allows.',
    }
  }

  return {
    decision: 'BORROW',
    requestedAmount,
    safeAmount,
    safeEMI,
    reason:
      'The requested loan amount appears to fit within your current safe EMI capacity based on the information provided.',
  }
}